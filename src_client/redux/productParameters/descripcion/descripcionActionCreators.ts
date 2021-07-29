import DescripcionActionTypes from "./descripcionActionTypes";
import Action from "../../type_action";

const setDescripcion = (payload: string): Action => ({
  type: DescripcionActionTypes.SET_DESCRIPCION,
  payload,
});
const resetDescripcion = (): Action => ({
  type: DescripcionActionTypes.RESET_DESCRIPCION,
});
export { setDescripcion, resetDescripcion };
