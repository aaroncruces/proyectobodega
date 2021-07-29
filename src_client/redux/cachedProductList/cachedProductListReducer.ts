import Action from "../type_action";
import ListaProductosActionsTypes from "./cachedProductListActionTypes";
import StateCachedProductList from "./type_StateCachedProductList";
const initialState: StateCachedProductList = {
  listaProductos: undefined,
};

const listaProductosReducer = (
  state: StateCachedProductList = initialState,
  action: Action
): StateCachedProductList => {
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
