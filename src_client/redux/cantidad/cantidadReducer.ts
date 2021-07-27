import Action from "../type_action";
import CantidadActionsTypes from "./cantidadActionTypes";
import StateCantidad from "./type_state_cantidad";
const initialState: StateCantidad = {
  cantidad: 0,
};
/**
 * Actualiza el Cantidad en la Store
 * @param state contiene el valor de cantidad, nada mas
 * @param action puede ser setCantidad(nuevoCANTIDAD) o resetCantidad
 * @returns
 */
const cantidadReducer = (
  state: StateCantidad = initialState,
  action: Action
): StateCantidad =>
  action.type == CantidadActionsTypes.SET_CANTIDAD
    ? { cantidad: action.payload }
    : action.type == CantidadActionsTypes.RESET_CANTIDAD
    ? { cantidad: "" }
    : { ...state };
export default cantidadReducer;
