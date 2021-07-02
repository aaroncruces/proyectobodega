import Action from "../type_action";
import ListaProductosActionsTypes from "./listaProductosActionTypes";
import StateListaProductos from "./type_state_listaProductos";
const initialState: StateListaProductos = {
  listaProductos: undefined,
};
/**
 * Actualiza el ListaProductos en la Store
 * @param state contiene el valor de listaProductos, nada mas
 * @param action puede ser setListaProductos(nuevoLISTA_PRODUCTOS) o resetListaProductos
 * @returns
 */
const listaProductosReducer = (
  state: StateListaProductos = initialState,
  action: Action
): StateListaProductos =>
  action.type == ListaProductosActionsTypes.SET_LISTA_PRODUCTOS
    ? { ...state, listaProductos: action.payload }
    : { ...state };
export default listaProductosReducer;
