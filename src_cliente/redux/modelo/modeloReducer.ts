import Action from "../type_action";
import ModeloActionsTypes from "./modeloActionTypes";
import StateModelo from "./type_state_modelo";
const initialState: StateModelo = {
  modelo: "",
};
/**
 * Actualiza el Modelo en la Store
 * @param state contiene el valor de modelo, nada mas
 * @param action puede ser setModelo(nuevoMODELO) o resetModelo
 * @returns
 */
const modeloReducer = (
  state: StateModelo = initialState,
  action: Action
): StateModelo =>
  action.type == ModeloActionsTypes.SET_MODELO
    ? { modelo: action.payload }
    : action.type == ModeloActionsTypes.RESET_MODELO
    ? { modelo: "" }
    : { ...state };
export default modeloReducer;
