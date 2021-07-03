import Producto from "../../src_servidor/tipos/Producto";

/**
 * Ciertos inputboxes necesitan ver la store para saber la validez del campo de texto
 *
 */
type Props_Inputbox_Ingreso = {
  listaProductos?: Producto[] | undefined;
};
export default Props_Inputbox_Ingreso;
