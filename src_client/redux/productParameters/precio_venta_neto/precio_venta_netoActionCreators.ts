import Precio_venta_netoActionTypes from "./precio_venta_netoActionTypes";
import Action from "../../type_action";

const setPrecio_venta_neto = (payload: number): Action => ({
  type: Precio_venta_netoActionTypes.SET_PRECIO_VENTA_NETO,
  payload,
});

const activatePrecio_venta_neto = (): Action => ({
  type: Precio_venta_netoActionTypes.ACTIVATE_PRECIO_VENTA_NETO,
});
const deactivatePrecio_venta_neto = (): Action => ({
  type: Precio_venta_netoActionTypes.DEACTIVATE_PRECIO_VENTA_NETO,
});
export {
  setPrecio_venta_neto,
  activatePrecio_venta_neto,
  deactivatePrecio_venta_neto,
};
