import CantidadActionTypes from "./cantidadActionTypes";
import Action from "../../type_action";

const setCantidad = (payload: number): Action => ({
  type: CantidadActionTypes.SET_CANTIDAD,
  payload,
});

export { setCantidad };
