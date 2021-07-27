import Codigo_barrasActionTypes from "./codigo_barrasActionTypes";
import Action from "../type_action";

const setCodigo_barras = (payload: string): Action => ({
  type: Codigo_barrasActionTypes.SET_CODIGO_BARRAS,
  payload,
});
const resetCodigo_barras = (): Action => ({
  type: Codigo_barrasActionTypes.RESET_CODIGO_BARRAS,
});

export { setCodigo_barras, resetCodigo_barras };
