import Action from "../../type_action";
import DescripcionActionsTypes from "./descripcionActionTypes";
import StateDescripcion from "./type_state_descripcion";
const initialState: StateDescripcion = {
  descripcion: "",
};
const descripcionReducer = (
  state: StateDescripcion = initialState,
  action: Action
): StateDescripcion =>
  action.type == DescripcionActionsTypes.SET_DESCRIPCION
    ? { descripcion: action.payload }
    : action.type == DescripcionActionsTypes.RESET_DESCRIPCION
    ? { descripcion: "" }
    : { ...state };
export default descripcionReducer;
