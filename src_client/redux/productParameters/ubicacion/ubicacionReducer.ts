import Action from "../../type_action";
import UbicacionActionsTypes from "./ubicacionActionTypes";
import StateUbicacion from "./type_state_ubicacion";
const initialState: StateUbicacion = {
  ubicacion: "",
  ubicacion_parameterActive: true,
};
const ubicacionReducer = (
  state: StateUbicacion = initialState,
  action: Action
): StateUbicacion =>
  action.type == UbicacionActionsTypes.SET_UBICACION
    ? { ...state, ubicacion: action.payload }
    : action.type == UbicacionActionsTypes.ACTIVATE_UBICACION
    ? { ...state, ubicacion_parameterActive: true }
    : action.type == UbicacionActionsTypes.DEACTIVATE_UBICACION
    ? { ...state, ubicacion_parameterActive: false }
    : { ...state };
export default ubicacionReducer;
