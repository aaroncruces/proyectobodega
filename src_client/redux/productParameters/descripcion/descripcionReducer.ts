import Action from "../../type_action";
import DescripcionActionsTypes from "./descripcionActionTypes";
import StateDescripcion from "./type_state_descripcion";
const initialState: StateDescripcion = {
  descripcion: "",
  descripcion_parameterActive: true,
};
const descripcionReducer = (
  state: StateDescripcion = initialState,
  action: Action
): StateDescripcion =>
  action.type == DescripcionActionsTypes.SET_DESCRIPCION
    ? { ...state, descripcion: action.payload }
    : action.type == DescripcionActionsTypes.ACTIVATE_DESCRIPCION
    ? { ...state, descripcion_parameterActive: true }
    : action.type == DescripcionActionsTypes.DEACTIVATE_DESCRIPCION
    ? { ...state, descripcion_parameterActive: false }
    : { ...state };
export default descripcionReducer;
