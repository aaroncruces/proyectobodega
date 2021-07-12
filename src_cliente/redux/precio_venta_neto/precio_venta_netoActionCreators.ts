import Precio_venta_netoActionTypes from "./precio_venta_netoActionTypes";
import Action from "../type_action";

const setPrecio_venta_neto = (payload: number): Action => ({
  type: Precio_venta_netoActionTypes.SET_PRECIO_VENTA_NETO,
  payload,
});

const resetPrecio_venta_neto = (): Action => ({
  type: Precio_venta_netoActionTypes.RESET_PRECIO_VENTA_NETO,
});

export { setPrecio_venta_neto, resetPrecio_venta_neto };
