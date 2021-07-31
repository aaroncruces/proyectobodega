import ModeloActionTypes from "./modeloActionTypes";
import Action from "../../type_action";

const setModelo = (payload: string): Action => ({
  type: ModeloActionTypes.SET_MODELO,
  payload,
});
const activateModelo = (): Action => ({
  type: ModeloActionTypes.ACTIVATE_MODELO,
});
const deactivateModelo = (): Action => ({
  type: ModeloActionTypes.DEACTIVATE_MODELO,
});
export { setModelo, activateModelo, deactivateModelo };
