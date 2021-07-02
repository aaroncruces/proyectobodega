/**
 * Entrega las acciones de actualizar el listaProductos entregando el nuevo texto,
 * y la de eliminar la listaProductos si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import ListaProductosActionTypes from "./listaProductosActionTypes";
import Action from "../type_action";
import Producto from "../../../src_servidor/tipos/Producto";
/**
 * La listaProductos es representada internamente como un array
 * @param payload
 * @returns
 */
const setListaProductos = (payload: Producto[]): Action => ({
  type: ListaProductosActionTypes.SET_LISTA_PRODUCTOS,
  payload,
});

export { setListaProductos };
