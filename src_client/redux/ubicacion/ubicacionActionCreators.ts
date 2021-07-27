import UbicacionActionTypes from "./ubicacionActionTypes";
import Action from "../type_action";

const setUbicacion = (payload: string): Action => ({
  type: UbicacionActionTypes.SET_UBICACION,
  payload,
});
const resetUbicacion = (): Action => ({
  type: UbicacionActionTypes.RESET_UBICACION,
});
export { setUbicacion, resetUbicacion };
