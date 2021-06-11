/**
 * Base de datos actual: mongodb
 */
const Mongoose = require("mongoose");

//promesa de conexion
const conexion = Mongoose.connect(
  "mongodb://localhost:27017/control_inventario"
);
//conexion.then().catch()
/**
 * Schema,
 */
/*
SKU(pk)
codigo_barras
modelo(required)
marca
cantidad
descripcion
precio_venta_neto
ubicacion
*/
const schemaProducto = new Mongoose.Schema({
  sku: { type: String, unique: true, required: true },
  codigo_barras: { type: String, default: "" },
  modelo: { type: String, required: true },
  marca: { type: String, default: "" },
  cantidad: { type: Number, default: 0 },
  descripcion: { type: String, default: "" },
  precio_venta_neto: { type: Number, default: 0 },
  ubicacion: { type: String, default: "" },
});
