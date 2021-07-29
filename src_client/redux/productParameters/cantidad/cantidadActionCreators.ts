import CantidadActionTypes from "./cantidadActionTypes";
import Action from "../../type_action";

const setCantidad = (payload: number): Action => ({
  type: CantidadActionTypes.SET_CANTIDAD,
  payload,
});

const resetCantidad = (): Action => ({
  type: CantidadActionTypes.RESET_CANTIDAD,
});

export { setCantidad, resetCantidad };
