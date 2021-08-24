import Precio_venta_brutoActionTypes from "./precio_venta_brutoActionTypes";
import Action from "../../type_action";

const activatePrecio_venta_bruto = (): Action => ({
  type: Precio_venta_brutoActionTypes.ACTIVATE_PRECIO_VENTA_BRUTO,
});
const deactivatePrecio_venta_bruto = (): Action => ({
  type: Precio_venta_brutoActionTypes.DEACTIVATE_PRECIO_VENTA_BRUTO,
});
export { activatePrecio_venta_bruto, deactivatePrecio_venta_bruto };
