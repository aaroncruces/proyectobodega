/**
 * Entrega las acciones de actualizar el cantidad entregando el nuevo texto,
 * y la de eliminar la cantidad si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import CantidadActionTypes from "./cantidadActionTypes";
import Action from "../type_action";
/**
 * La cantidad es representada internamente como un numero, no un string
 * pero debe ser posible ingresarla como string (debido a su formato en el cuadro de texto)
 * @param payload
 * @returns
 */
const setCantidad = (payload: number): Action => ({
  type: CantidadActionTypes.SET_CANTIDAD,
  payload,
});

const resetCantidad = (): Action => ({
  type: CantidadActionTypes.RESET_CANTIDAD,
});

export { setCantidad, resetCantidad };
