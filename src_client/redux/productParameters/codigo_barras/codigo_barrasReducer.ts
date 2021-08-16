import Action from "../../type_action";
import Codigo_barrasActionsTypes from "./codigo_barrasActionTypes";
import StateCodigo_barras from "./type_state_codigo_barras";
const initialState: StateCodigo_barras = {
  codigo_barras: "",
  codigo_barras_parameterActive: true,
};
const codigo_barrasReducer = (
  state: StateCodigo_barras = initialState,
  action: Action
): StateCodigo_barras =>
  action.type == Codigo_barrasActionsTypes.SET_CODIGO_BARRAS
    ? { ...state, codigo_barras: action.payload }
    : action.type == Codigo_barrasActionsTypes.ACTIVATE_CODIGO_BARRAS
    ? { ...state, codigo_barras_parameterActive: true }
    : action.type == Codigo_barrasActionsTypes.DEACTIVATE_CODIGO_BARRAS
    ? { ...state, codigo_barras_parameterActive: false }
    : { ...state };
export default codigo_barrasReducer;
