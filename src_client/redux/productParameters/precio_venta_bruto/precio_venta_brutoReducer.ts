import Action from "../../type_action";
import Precio_venta_brutoActionsTypes from "./precio_venta_brutoActionTypes";
import StatePrecio_venta_bruto from "./type_state_precio_venta_bruto";

const initialState: StatePrecio_venta_bruto = {
  precio_venta_bruto_parameterActive: true,
};
const precio_venta_brutoReducer = (
  state: StatePrecio_venta_bruto = initialState,
  action: Action
): StatePrecio_venta_bruto =>
  action.type == Precio_venta_brutoActionsTypes.ACTIVATE_PRECIO_VENTA_BRUTO
    ? { ...state, precio_venta_bruto_parameterActive: true }
    : action.type ==
      Precio_venta_brutoActionsTypes.DEACTIVATE_PRECIO_VENTA_BRUTO
    ? { ...state, precio_venta_bruto_parameterActive: false }
    : { ...state };
export default precio_venta_brutoReducer;
