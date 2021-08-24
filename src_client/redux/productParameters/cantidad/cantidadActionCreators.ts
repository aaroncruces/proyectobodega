import CantidadActionTypes from "./cantidadActionTypes";
import Action from "../../type_action";

const setCantidad = (payload: number): Action => ({
  type: CantidadActionTypes.SET_CANTIDAD,
  payload,
});

const activateCantidad = (): Action => ({
  type: CantidadActionTypes.ACTIVATE_CANTIDAD,
});
const deactivateCantidad = (): Action => ({
  type: CantidadActionTypes.DEACTIVATE_CANTIDAD,
});

export { setCantidad, activateCantidad, deactivateCantidad };
