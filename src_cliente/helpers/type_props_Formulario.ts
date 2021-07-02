import Producto from "../../src_servidor/tipos/Producto";

/**
 * Quedan las variables marcadas como opcionales,
 * ya que son seteadas por distintas funciones, pero en realidad, son obligatorias
 */
type Props_Formulario = {
  /**
   * Los formularios deben poder acceder a la lista de productos, no solo por la DB,
   * si no, que principalmente, mediante la store (cache)
   */
  listaProductos?: Producto[];
  /**
   * Cada formulario puede, de una u otra manera, actualizar la DB
   */
  setListaProductos?: (Productos: Producto[]) => any;
};
export default Props_Formulario;
