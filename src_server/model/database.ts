import mongoose from "mongoose";
import Product from "../types/Product";
import { InsertErrors } from "../types/InsertErrors"; //llaves necesarios debido al error de export default enum

const ModeloProducto = require("./producto");

const conexion = mongoose.connect("mongodb://localhost/control_inventario", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  //autoIndex: true, //esto era para cuando se usa mongoose.Schema({key: { type:Type, unique: true, required: true}})
});

export const ingresar_producto = async (producto: Product) => {
  try {
    if (!producto) {
      throw {
        codigo_error: InsertErrors.PRODUCTO_NO_EXISTE,
      };
    }
    if (!producto.sku || producto.sku == "") {
      throw {
        codigo_error: InsertErrors.SKU_VACIA,
      };
    }
    if (!producto.modelo || producto.modelo == "") {
      throw {
        codigo_error: InsertErrors.MODELO_VACIO,
      };
    }
    const producto_sku_encontrada: Product = await ModeloProducto.findOne({
      sku: producto.sku,
    });
    if (producto_sku_encontrada) {
      throw {
        codigo_error: InsertErrors.SKU_REPETIDA,
        producto: producto_sku_encontrada,
      };
    }
    const producto_modelo_marca_encontrada: Product =
      await ModeloProducto.findOne({
        modelo: producto.modelo,
        marca: producto.marca,
      });
    if (producto_modelo_marca_encontrada) {
      throw {
        codigo_error: InsertErrors.MODELO_MARCA_REPETIDA,
        producto: producto_modelo_marca_encontrada,
      };
    }
    if (producto.codigo_barras && producto.codigo_barras != "") {
      const producto_codigo_barras_encontrado: Product =
        await ModeloProducto.findOne({
          codigo_barras: producto.codigo_barras,
        });
      if (producto_codigo_barras_encontrado) {
        throw {
          codigo_error: InsertErrors.CODIGO_BARRAS_NO_VACIO_REPETIDO,
          producto: producto_codigo_barras_encontrado,
        };
      }
    }
    await ModeloProducto.create(producto);
  } catch (error) {
    if (!error.codigo_error) {
      throw { codigo_error: InsertErrors.OTRO_ERROR, error };
    }
    throw error;
  }
};

export const obtener_lista_productos = async (): Promise<Product[]> => {
  try {
    const todos_los_productos: Product[] = await ModeloProducto.find({});
    return todos_los_productos;
  } catch (error) {
    throw error;
  }
};

export const modify_product_parameter = async (
  sku: string,
  keyValuePair: object
) => {
  try {
    const result = await ModeloProducto.updateOne(
      { sku },
      { $set: keyValuePair }
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
/**
 * Borrar:
 */
//  .deleteOne({ cantidad: 0 });
