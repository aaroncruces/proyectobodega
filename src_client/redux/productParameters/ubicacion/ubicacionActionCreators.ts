import UbicacionActionTypes from "./ubicacionActionTypes";
import Action from "../../type_action";

const setUbicacion = (payload: string): Action => ({
  type: UbicacionActionTypes.SET_UBICACION,
  payload,
});
const activateUbicacion = (): Action => ({
  type: UbicacionActionTypes.ACTIVATE_UBICACION,
});
const deactivateUbicacion = (): Action => ({
  type: UbicacionActionTypes.DEACTIVATE_UBICACION,
});
export { setUbicacion, activateUbicacion, deactivateUbicacion };
