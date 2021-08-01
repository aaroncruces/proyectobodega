import Action from "../../type_action";
import MarcaActionTypes from "./marcaActionTypes";
import StateMarca from "./type_state_marca";
const initialState: StateMarca = {
  marca: "",
  marca_parameterActive: true,
};
const marcaReducer = (
  state: StateMarca = initialState,
  action: Action
): StateMarca =>
  action.type == MarcaActionTypes.SET_MARCA
    ? { ...state, marca: action.payload }
    : action.type == MarcaActionTypes.ACTIVATE_MARCA
    ? { ...state, marca_parameterActive: true }
    : action.type == MarcaActionTypes.DEACTIVATE_MARCA
    ? { ...state, marca_parameterActive: false }
    : { ...state };
export default marcaReducer;
