/**
 * Entrega las acciones de actualizar el modelo entregando el nuevo texto,
 * y la de eliminar el modelo si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import ModeloActionTypes from "./modeloActionTypes";
import Action from "../type_action";

const setModelo = (payload: string): Action => ({
  type: ModeloActionTypes.SET_MODELO,
  payload,
});
const resetModelo = (): Action => ({ type: ModeloActionTypes.RESET_MODELO });
export { setModelo, resetModelo };
