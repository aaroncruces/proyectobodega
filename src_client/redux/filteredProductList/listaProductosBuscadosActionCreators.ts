import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import ListaProductosBuscadosActionsTypes from "./listaProductosBuscadosActionTypes";

const setListaProductosBuscados = (payload: Product[]): Action => ({
  type: ListaProductosBuscadosActionsTypes.SET_LISTA_PRODUCTOS_BUSCADOS,
  payload,
});
export { setListaProductosBuscados };
