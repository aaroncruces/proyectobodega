import Action from "../../type_action";
import ActiveParameterActionsTypes from "./activeParameterActionTypes";
import ActiveParameterName from "./enum_ActiveParameterName";
import StateActiveParameter from "./type_StateStateActiveParameter";

const initialState: StateActiveParameter = {
  parameterActive: ActiveParameterName.NONE,
};
const activeParameterReducer = (
  state: StateActiveParameter = initialState,
  action: Action
): StateActiveParameter =>
  action.type == ActiveParameterActionsTypes.SET_ACTIVE_PARAMETER
    ? { ...state, parameterActive: action.payload }
    : { ...state };
export default activeParameterReducer;
