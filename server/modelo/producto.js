/**
 * Modelo: Producto
 * Definicion de un producto para guardar en database mongodb.
 */
const Mongoose = require("mongoose");
/**
 * Definicion verbosa de nombre de la coleccion en DB
 * para evitar el agregar la 's al final del nombre del modelo
 */
const nombreColeccion = "productos";

const schemaProducto = new Mongoose.Schema(
  {
    sku: { type: String, default: "" }, //deletear: , default: ""; agregar: , unique: true , required: true
    codigo_barras: { type: String, default: "" },
    modelo: { type: String, default: "" }, //deletear: , default: ""; agregar: , required: true
    marca: { type: String, default: "" },
    cantidad: { type: Number, default: 0 },
    descripcion: { type: String, default: "" },
    precio_venta_neto: { type: Number, default: 0 },
    ubicacion: { type: String, default: "" },
  },
  {
    collection: nombreColeccion,
  }
);

// nombre de la coleccion: productos
module.exports = Mongoose.model(nombreColeccion, schemaProducto);
