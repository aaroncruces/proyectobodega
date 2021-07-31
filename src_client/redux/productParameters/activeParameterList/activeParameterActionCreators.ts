import ActiveParameterActionsTypes from "./activeParameterActionTypes";
import Action from "../../type_action";
import ActiveParameterName from "./enum_ActiveParameterName";

const setActiveParameter = (payload: ActiveParameterName): Action => ({
  type: ActiveParameterActionsTypes.SET_ACTIVE_PARAMETER,
  payload,
});

export { setActiveParameter };
