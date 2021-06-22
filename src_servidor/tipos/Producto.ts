/**
 * Definicion de producto, vease server/modelo
 * tambien se usa desde el cliente,
 * se encuentra aquí ya que es el servidor el que lo "compilo" con tsc
 * (y da cosas raras si no restrinjo accesos a carpetas en tsconfig)
 */
export default class Producto {
  sku: string = "";
  codigo_barras: string = "";
  modelo: string = "";
  marca: string = "";
  cantidad = 0;
  descripcion: string = "";
  precio_venta_neto = 0;
  ubicacion: string = "";
}
