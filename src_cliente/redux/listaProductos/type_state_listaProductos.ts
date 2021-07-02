import Producto from "../../../src_servidor/tipos/Producto";

/**
 * El store almacena, a demas del producto con el que estoy trabajando,
 * los productos que se encuentren en la DB
 * - Si la DB se encuentra vacia, listaProductos=[]
 * - Si aun no se ha consultado, o la DB no responde, listaProductos=undefined
 */
type StateListaProductos = {
  listaProductos: Producto[] | undefined;
};
export default StateListaProductos;
