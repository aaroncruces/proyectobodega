import Action from "../../type_action";
import CantidadActionsTypes from "./cantidadActionTypes";
import StateCantidad from "./type_state_cantidad";

const initialState: StateCantidad = {
  cantidad: 0,
};
const cantidadReducer = (
  state: StateCantidad = initialState,
  action: Action
): StateCantidad =>
  action.type == CantidadActionsTypes.SET_CANTIDAD
    ? { ...state, cantidad: action.payload }
    : action.type == CantidadActionsTypes.RESET_CANTIDAD
    ? { ...state, cantidad: "" }
    : { ...state };
export default cantidadReducer;
