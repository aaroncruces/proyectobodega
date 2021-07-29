import Action from "../../type_action";
import Precio_venta_netoActionsTypes from "./precio_venta_netoActionTypes";
import StatePrecio_venta_neto from "./type_state_precio_venta_neto";

const initialState: StatePrecio_venta_neto = {
  precio_venta_neto: 0,
};
const precio_venta_netoReducer = (
  state: StatePrecio_venta_neto = initialState,
  action: Action
): StatePrecio_venta_neto =>
  action.type == Precio_venta_netoActionsTypes.SET_PRECIO_VENTA_NETO
    ? { precio_venta_neto: action.payload }
    : action.type == Precio_venta_netoActionsTypes.RESET_PRECIO_VENTA_NETO
    ? { precio_venta_neto: "" }
    : { ...state };
export default precio_venta_netoReducer;
