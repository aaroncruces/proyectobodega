import Action from "../../type_action";
import CantidadActionsTypes from "./cantidadActionTypes";
import StateCantidad from "./type_state_cantidad";

const initialState: StateCantidad = {
  cantidad: 0,
  cantidad_parameterActive: true,
};
const cantidadReducer = (
  state: StateCantidad = initialState,
  action: Action
): StateCantidad =>
  action.type == CantidadActionsTypes.SET_CANTIDAD
    ? { ...state, cantidad: action.payload }
    : action.type == CantidadActionsTypes.ACTIVATE_CANTIDAD
    ? { ...state, cantidad_parameterActive: true }
    : action.type == CantidadActionsTypes.DEACTIVATE_CANTIDAD
    ? { ...state, cantidad_parameterActive: false }
    : { ...state };
export default cantidadReducer;
