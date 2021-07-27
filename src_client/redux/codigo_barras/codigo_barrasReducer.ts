import Action from "../type_action";
import Codigo_barrasActionsTypes from "./codigo_barrasActionTypes";
import StateCodigo_barras from "./type_state_codigo_barras";
const initialState: StateCodigo_barras = {
  codigo_barras: "",
};
/**
 * Actualiza el Codigo_barras en la Store
 * @param state contiene el valor de codigo_barras, nada mas
 * @param action puede ser setCodigo_barras(nuevoCODIGO_BARRAS) o resetCodigo_barras
 * @returns
 */
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
