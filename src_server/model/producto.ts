import mongoose from "mongoose";
const nombreColeccion = "productos";
const schemaProducto = new mongoose.Schema(
  {
    sku: { type: String, default: "" },
    codigo_barras: { type: String, default: "" },
    modelo: { type: String, default: "" },
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
module.exports = mongoose.model(nombreColeccion, schemaProducto);
