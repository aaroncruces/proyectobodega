import Action from "../type_action";
import Codigo_barrasActionsTypes from "./codigo_barrasActionTypes";
import StateCodigo_barras from "./type_state_codigo_barras";
const initialState: StateCodigo_barras = {
  codigo_barras: "",
};
const codigo_barrasReducer = (
  state: StateCodigo_barras = initialState,
  action: Action
): StateCodigo_barras =>
  action.type == Codigo_barrasActionsTypes.SET_CODIGO_BARRAS
    ? { codigo_barras: action.payload }
    : action.type == Codigo_barrasActionsTypes.RESET_CODIGO_BARRAS
    ? { codigo_barras: "" }
    : { ...state };
export default codigo_barrasReducer;
