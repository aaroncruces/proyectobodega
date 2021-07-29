import Action from "../type_action";
import ListaProductosActionsTypes from "./listaProductosBuscadosActionTypes";
import StateListaProductos from "./type_state_listaProductosBuscados";
const initialState: StateListaProductos = {
  listaProductosBuscados: undefined,
};

const listaProductosReducer = (
  state: StateListaProductos = initialState,
  action: Action
): StateListaProductos => {
  return action.type == ListaProductosActionsTypes.SET_LISTA_PRODUCTOS_BUSCADOS
    ? { ...state, listaProductosBuscados: action.payload }
    : { ...state };
};
export default listaProductosReducer;
