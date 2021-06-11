const Mongoose = require("mongoose");
const ModeloProducto = require("./producto");
//promesa de conexion
const conexion = Mongoose.connect(
  "mongodb://localhost:27017/control_inventario"
);
//conexion.then().catch()

//necesita al menos sku y modelo
