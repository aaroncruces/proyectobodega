import Action from "../type_action";
import UbicacionActionsTypes from "./ubicacionActionTypes";
import StateUbicacion from "./type_state_ubicacion";
const initialState: StateUbicacion = {
  ubicacion: "",
};
/**
 * Actualiza el Ubicacion en la Store
 * @param state contiene el valor de ubicacion, nada mas
 * @param action puede ser setUbicacion(nuevoUBICACION) o resetUbicacion
 * @returns
 */
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
