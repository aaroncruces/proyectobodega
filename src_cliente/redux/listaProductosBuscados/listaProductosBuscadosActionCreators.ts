import Action from "../type_action";
import Producto from "../../../src_servidor/tipos/Producto";
import ListaProductosBuscadosActionsTypes from "./listaProductosBuscadosActionTypes";

const setListaProductosBuscados = (payload: Producto[]): Action => ({
  type: ListaProductosBuscadosActionsTypes.SET_LISTA_PRODUCTOS_BUSCADOS,
  payload,
});
export { setListaProductosBuscados };
