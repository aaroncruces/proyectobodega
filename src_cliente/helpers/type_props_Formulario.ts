import Producto from "../../src_servidor/tipos/Producto";

/**
 * Props que deban pasarse desde la store
 * - Quedan las variables marcadas como opcionales,
 * ya que son seteadas por distintas funciones, pero en realidad, son obligatorias
 */
type Props_Formulario_Ingreso = {
  /**
   * Los formularios deben poder acceder a la lista de productos, no solo por la DB,
   * si no, que principalmente, mediante la store (cache)
   */
  listaProductos?: Producto[];

  /**
   * El formulario debe cargar la lista de productos desde la SB
   */
  fetchListaProductos?: () => any;
  /**
   * El formulario debe guardar la lista de productos hasta la SB
   */
  postListaProductos?: (productos: Producto[]) => any;
};
export default Props_Formulario_Ingreso;
