import MarcaActionTypes from "./marcaActionTypes";
import Action from "../type_action";

const setMarca = (payload: string): Action => ({
  type: MarcaActionTypes.SET_MARCA,
  payload,
});
const resetMarca = (): Action => ({ type: MarcaActionTypes.RESET_MARCA });
export { setMarca, resetMarca };
