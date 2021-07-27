import mongoose from "mongoose";
import Producto from "../types/Producto";
import { Errores_ingreso } from "../types/Errores_ingreso"; //llaves necesarios debido al error de export default enum

const ModeloProducto = require("./producto");
//promesa de conexion

const conexion = mongoose.connect("mongodb://localhost/control_inventario", {
  //Esto es para saltar los asquerosos "deprecation warnings" de MongoDB,
  //borrar en un futuro, tanto los k:v como el objeto este
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  //autoIndex: true, //esto era para cuando se usa mongoose.Schema({key: { type:Type, unique: true, required: true}})
});
//conexion.then().catch()

/**
 * añadiendo un producto generico
 */
export const ingresar_producto = async (producto: Producto) => {
  try {
    // Condiciones de ingreso:
    // 0) el producto debe existir
    // 1) sku debe estar presente, no ser ""
    // 2) modelo debe estar presente, no ser ""
    // 3) sku debe ser unico, no existir en la base de datos.
    //    en caso de existir, indicar el nombre+marca del producto al que pertenece
    // 4) la combinacion de modelo+marca debe ser unica
    //    idem caso 3 (con sku)
    // 5) el codigo de barras puede ser vacio, pero si no, debe ser unico
    // Dada la comprejidad de la combinacion de condiciones 3 4 y 5,
    // no puedo utilizar el manejo de errores de mongo/mongoose,
    // asi que los chequeos se harán manualmente.
    // ! en condiciones normales, los errores 0,1,2 no deberian gatillarse
    // ! se manejan en caso de haber error del programador

    // 0) el producto debe existir
    if (!producto) {
      throw {
        codigo_error: Errores_ingreso.PRODUCTO_NO_EXISTE,
      };
    }
    // 1) sku debe estar presente, no ser ""
    if (!producto.sku || producto.sku == "") {
      throw {
        codigo_error: Errores_ingreso.SKU_VACIA,
      };
    }
    // 2) modelo debe estar presente, no ser ""
    if (!producto.modelo || producto.modelo == "") {
      throw {
        codigo_error: Errores_ingreso.MODELO_VACIO,
      };
    }
    // 3) sku debe ser unico, no existir en la base de datos.
    const producto_sku_encontrada: Producto = await ModeloProducto.findOne({
      sku: producto.sku,
    });
    if (producto_sku_encontrada) {
      throw {
        codigo_error: Errores_ingreso.SKU_REPETIDA,
        producto: producto_sku_encontrada,
      };
    }

    // 4) la combinacion de modelo+marca debe ser unica
    const producto_modelo_marca_encontrada: Producto =
      await ModeloProducto.findOne({
        modelo: producto.modelo,
        marca: producto.marca,
      });
    if (producto_modelo_marca_encontrada) {
      throw {
        codigo_error: Errores_ingreso.MODELO_MARCA_REPETIDA,
        producto: producto_modelo_marca_encontrada,
      };
    }

    // 5) el codigo de barras puede ser vacio, pero si no, debe ser unico
    if (producto.codigo_barras && producto.codigo_barras != "") {
      const producto_codigo_barras_encontrado: Producto =
        await ModeloProducto.findOne({
          codigo_barras: producto.codigo_barras,
        });
      if (producto_codigo_barras_encontrado) {
        throw {
          codigo_error: Errores_ingreso.CODIGO_BARRAS_NO_VACIO_REPETIDO,
          producto: producto_codigo_barras_encontrado,
        };
      }
    }

    // Ahora si, intento ingresar producto a la DB.
    await ModeloProducto.create(producto);
  } catch (error) {
    //En caso de cualquier error que no sea de ingreso, especificarlo y hacer forwarding
    if (!error.codigo_error) {
      throw { codigo_error: Errores_ingreso.OTRO_ERROR, error };
    }
    //en caso de ser un error "esperado"
    throw error;
  }
};

export const obtener_lista_productos = async (): Promise<Producto[]> => {
  try {
    const todos_los_productos: Producto[] = await ModeloProducto.find({});
    return todos_los_productos;
  } catch (error) {
    throw error;
  }
};

/**
 * Encontrar 1 solo :
 */
//  .findOne({ cantidad: 0 });

/**
 * Modificar.
 * $set permite conservar valores antiguos del objeto encontrado
 */
// (async () => {
//   console.log(
//     await ModeloProducto.updateOne(
//       { _id: "60c2ce4074f5e42acda6a8c2" },
//       { $set: { cantidad: 7 } }
//     )
//   );
// })();

/**
 * Borrar:
 */
//  .deleteOne({ cantidad: 0 });
