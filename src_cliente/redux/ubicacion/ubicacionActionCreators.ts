/**
 * Entrega las acciones de actualizar el ubicacion entregando el nuevo texto,
 * y la de eliminar el ubicacion si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import UbicacionActionTypes from "./ubicacionActionTypes";
import Action from "../type_action";

const setUbicacion = (payload: string): Action => ({
  type: UbicacionActionTypes.SET_UBICACION,
  payload,
});
const resetUbicacion = (): Action => ({
  type: UbicacionActionTypes.RESET_UBICACION,
});
export { setUbicacion, resetUbicacion };
