import mongoose from "mongoose";
import Producto from "../tipos/Producto";
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
const ingresar_producto = async (producto: Producto) => {
  console.log("ingresando producto");
  try {
    // Condiciones de ingreso:
    // 1) sku debe estar presente, no ser ""
    // 2) sku debe ser unico, no existir en la base de datos.
    //    en caso de existir, indicar el nombre+marca del producto al que pertenece
    // 3) modelo debe estar presente, no ser ""
    // 4) la combinacion de modelo+marca debe ser unica

    //chequeo condicion 2:
    let lista_chequeo = await ModeloProducto.find({ sku: producto.sku });
    if (lista_chequeo.length > 0) {
      console.log("sku existente");
      //throw
    }
    lista_chequeo = await obtener_productos("sku", "AH");
    if (lista_chequeo.length > 0) {
      console.log("sku existente");
      //throw
    }
    //intento ingresar producto a la DB.
    // se obtiene un objeto exitoso o tira un error, el objeto se descarta
    //const producto_a_DB = new ModeloProducto(producto);
    //await ModeloProducto.create(producto);
    //await producto_a_DB.save();
    console.log("producto Ingresado ");
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { ingresar_producto };
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
