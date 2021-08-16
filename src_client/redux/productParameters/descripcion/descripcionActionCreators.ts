import DescripcionActionTypes from "./descripcionActionTypes";
import Action from "../../type_action";

const setDescripcion = (payload: string): Action => ({
  type: DescripcionActionTypes.SET_DESCRIPCION,
  payload,
});
const activateDescripcion = (): Action => ({
  type: DescripcionActionTypes.ACTIVATE_DESCRIPCION,
});
const deactivateDescripcion = (): Action => ({
  type: DescripcionActionTypes.DEACTIVATE_DESCRIPCION,
});
export { setDescripcion, activateDescripcion, deactivateDescripcion };
