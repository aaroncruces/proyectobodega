import ModeloActionTypes from "./modeloActionTypes";
import Action from "../../type_action";

const setModelo = (payload: string): Action => ({
  type: ModeloActionTypes.SET_MODELO,
  payload,
});
const resetModelo = (): Action => ({ type: ModeloActionTypes.RESET_MODELO });
export { setModelo, resetModelo };
