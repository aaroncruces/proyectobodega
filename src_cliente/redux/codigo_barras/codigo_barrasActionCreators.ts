/**
 * Entrega las acciones de actualizar el codigo_barras entregando el nuevo texto,
 * y la de eliminar el codigo_barras si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
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
