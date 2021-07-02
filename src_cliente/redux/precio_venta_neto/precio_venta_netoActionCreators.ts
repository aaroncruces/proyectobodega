/**
 * Entrega las acciones de actualizar el precio_venta_neto entregando el nuevo texto,
 * y la de eliminar la precio_venta_neto si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import Precio_venta_netoActionTypes from "./precio_venta_netoActionTypes";
import Action from "../type_action";
/**
 * El precio_venta_neto es representado internamente como un numero, no un string
 * @param payload
 * @returns
 */
const setPrecio_venta_neto = (payload: number): Action => ({
  type: Precio_venta_netoActionTypes.SET_PRECIO_VENTA_NETO,
  payload,
});

const resetPrecio_venta_neto = (): Action => ({
  type: Precio_venta_netoActionTypes.RESET_PRECIO_VENTA_NETO,
});

export { setPrecio_venta_neto, resetPrecio_venta_neto };
