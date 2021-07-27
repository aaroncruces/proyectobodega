import Action from "../type_action";
import ListaProductosActionsTypes from "./listaProductosActionTypes";
import StateListaProductos from "./type_state_listaProductos";
const initialState: StateListaProductos = {
  listaProductos: undefined,
};

const listaProductosReducer = (
  state: StateListaProductos = initialState,
  action: Action
): StateListaProductos => {
  return action.type == ListaProductosActionsTypes.SET_LISTA_PRODUCTOS
    ? { ...state, listaProductos: action.payload }
    : action.type == ListaProductosActionsTypes.PUSH_PRODUCTO
    ? {
        ...state,
        listaProductos: [...state.listaProductos, action.payload],
      }
    : action.type == ListaProductosActionsTypes.MODIFY_PRODUCTO
    ? { ...state }
    : action.type == ListaProductosActionsTypes.DELETE_PRODUCTO
    ? { ...state }
    : action.type == ListaProductosActionsTypes.CHANGE_PRODUCTO_AMOUNT
    ? { ...state }
    : { ...state };
};
export default listaProductosReducer;
