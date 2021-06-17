/**
 * Definicion de producto, vease server/modelo
 * tambien se usa desde el cliente,
 * se encuentra aquí ya que es el servidor el que lo "compilo" con tsc
 * (y da cosas raras si no restrinjo accesos a carpetas en tsconfig)
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
