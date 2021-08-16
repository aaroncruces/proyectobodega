import Codigo_barrasActionTypes from "./codigo_barrasActionTypes";
import Action from "../../type_action";

const setCodigo_barras = (payload: string): Action => ({
  type: Codigo_barrasActionTypes.SET_CODIGO_BARRAS,
  payload,
});
const activateCodigo_barras = (): Action => ({
  type: Codigo_barrasActionTypes.ACTIVATE_CODIGO_BARRAS,
});
const deactivateCodigo_barras = (): Action => ({
  type: Codigo_barrasActionTypes.DEACTIVATE_CODIGO_BARRAS,
});
export { setCodigo_barras, activateCodigo_barras, deactivateCodigo_barras };
