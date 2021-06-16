/**
 * Modelo: Producto
 * Definicion de un producto para guardar en database mongodb.
 */
import mongoose from "mongoose";
/**
 * Definicion verbosa de nombre de la coleccion en DB
 * para evitar el agregar la 's al final del nombre del modelo
 */
const nombreColeccion = "productos";

/**
 * {unique: true, required: true} son innecesarios.
 * dada la naturaleza de las condiciones (vease tababase.ingresar_producto)
 */
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
