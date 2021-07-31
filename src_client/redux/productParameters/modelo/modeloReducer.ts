import Action from "../../type_action";
import ModeloActionTypes from "./modeloActionTypes";
import StateModelo from "./type_state_modelo";

const initialState: StateModelo = {
  modelo: "",
  modelo_parameterActive: true,
};
const modeloReducer = (
  state: StateModelo = initialState,
  action: Action
): StateModelo =>
  action.type == ModeloActionTypes.SET_MODELO
    ? { ...state, modelo: action.payload }
    : action.type == ModeloActionTypes.ACTIVATE_MODELO
    ? { ...state, modelo_parameterActive: true }
    : action.type == ModeloActionTypes.DEACTIVATE_MODELO
    ? { ...state, modelo_parameterActive: false }
    : { ...state };
export default modeloReducer;
