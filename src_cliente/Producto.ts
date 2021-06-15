/**
 * Definicion de producto, vease server/modelo
 */
export default class Producto {
  sku: String = "";
  codigo_barras: String = "";
  modelo: String = "";
  marca: String = "";
  cantidad = 0;
  descripcion: String = "";
  precio_venta_neto = 0;
  ubicacion: String = "";
}
// {
//     sku: { type: String, default: "" }, //deletear: , default: ""; agregar: , unique: true , required: true
//     codigo_barras: { type: String, default: "" },
//     modelo: { type: String, default: "" }, //deletear: , default: ""; agregar: , required: true
//     marca: { type: String, default: "" },
//     cantidad: { type: Number, default: 0 },
//     descripcion: { type: String, default: "" },
//     precio_venta_neto: { type: Number, default: 0 },
//     ubicacion: { type: String, default: "" },
//   },
