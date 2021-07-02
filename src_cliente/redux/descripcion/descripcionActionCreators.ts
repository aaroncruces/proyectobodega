/**
 * Entrega las acciones de actualizar el descripcion entregando el nuevo texto,
 * y la de eliminar el descripcion si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import DescripcionActionTypes from "./descripcionActionTypes";
import Action from "../type_action";

const setDescripcion = (payload: string): Action => ({
  type: DescripcionActionTypes.SET_DESCRIPCION,
  payload,
});
const resetDescripcion = (): Action => ({
  type: DescripcionActionTypes.RESET_DESCRIPCION,
});
export { setDescripcion, resetDescripcion };
