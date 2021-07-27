import Action from "../type_action";
import DescripcionActionsTypes from "./descripcionActionTypes";
import StateDescripcion from "./type_state_descripcion";
const initialState: StateDescripcion = {
  descripcion: "",
};
/**
 * Actualiza el Descripcion en la Store
 * @param state contiene el valor de descripcion, nada mas
 * @param action puede ser setDescripcion(nuevoDESCRIPCION) o resetDescripcion
 * @returns
 */
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
