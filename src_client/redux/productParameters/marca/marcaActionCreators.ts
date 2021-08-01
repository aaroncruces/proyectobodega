import MarcaActionTypes from "./marcaActionTypes";
import Action from "../../type_action";

const setMarca = (payload: string): Action => ({
  type: MarcaActionTypes.SET_MARCA,
  payload,
});
const activateMarca = (): Action => ({
  type: MarcaActionTypes.ACTIVATE_MARCA,
});
const deactivateMarca = (): Action => ({
  type: MarcaActionTypes.DEACTIVATE_MARCA,
});
export { setMarca, activateMarca, deactivateMarca };
