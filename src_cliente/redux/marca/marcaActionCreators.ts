/**
 * Entrega las acciones de actualizar el marca entregando el nuevo texto,
 * y la de eliminar el marca si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import MarcaActionTypes from "./marcaActionTypes";
import Action from "../type_action";

const setMarca = (payload: string): Action => ({
  type: MarcaActionTypes.SET_MARCA,
  payload,
});
const resetMarca = (): Action => ({ type: MarcaActionTypes.RESET_MARCA });
export { setMarca, resetMarca };
