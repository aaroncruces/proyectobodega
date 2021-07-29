import Action from "../../type_action";
import ModeloActionsTypes from "./modeloActionTypes";
import StateModelo from "./type_state_modelo";

const initialState: StateModelo = {
  modelo: "",
};
const modeloReducer = (
  state: StateModelo = initialState,
  action: Action
): StateModelo =>
  action.type == ModeloActionsTypes.SET_MODELO
    ? { ...state, modelo: action.payload }
    : action.type == ModeloActionsTypes.RESET_MODELO
    ? { ...state, modelo: "" }
    : { ...state };
export default modeloReducer;
