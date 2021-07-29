import Action from "../../type_action";
import MarcaActionsTypes from "./marcaActionTypes";
import StateMarca from "./type_state_marca";
const initialState: StateMarca = {
  marca: "",
};
const marcaReducer = (
  state: StateMarca = initialState,
  action: Action
): StateMarca =>
  action.type == MarcaActionsTypes.SET_MARCA
    ? { marca: action.payload }
    : action.type == MarcaActionsTypes.RESET_MARCA
    ? { marca: "" }
    : { ...state };
export default marcaReducer;
