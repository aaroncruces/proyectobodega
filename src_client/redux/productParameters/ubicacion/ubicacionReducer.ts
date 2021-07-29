import Action from "../../type_action";
import UbicacionActionsTypes from "./ubicacionActionTypes";
import StateUbicacion from "./type_state_ubicacion";
const initialState: StateUbicacion = {
  ubicacion: "",
};
const ubicacionReducer = (
  state: StateUbicacion = initialState,
  action: Action
): StateUbicacion =>
  action.type == UbicacionActionsTypes.SET_UBICACION
    ? { ubicacion: action.payload }
    : action.type == UbicacionActionsTypes.RESET_UBICACION
    ? { ubicacion: "" }
    : { ...state };
export default ubicacionReducer;
