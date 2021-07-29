import ActiveParameterActionsTypes from "./activeParameterActionTypes";
import Action from "../../type_action";

const setActiveParameter = (payload: number): Action => ({
  type: ActiveParameterActionsTypes.SET_ACTIVE_PARAMETER,
  payload,
});

export { setActiveParameter };
