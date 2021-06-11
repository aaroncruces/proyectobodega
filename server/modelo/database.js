const Mongoose = require("mongoose");
const ModeloProducto = require("./producto");
//promesa de conexion

const conexion = Mongoose.connect("mongodb://localhost/control_inventario", {
  //Esto es para saltar los asquerosos "deprecation warnings" de MongoDB,
  //borrar en un futuro, tanto los k:v como el objeto este
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
//conexion.then().catch()

// /**
//  * añadiendo un producto generico
//  */
// (async () => {
//   console.log(await ModeloProducto.create({}));
// })();

/**
 * Encontrar todos los que: cantidad: 0
 */
// (async () => {
//   console.log(await ModeloProducto.find({ cantidad: 0 }));
// })();

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
