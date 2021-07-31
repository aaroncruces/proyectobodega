import ActiveParameterListActionsTypes from "./activeParameterListActionTypes";
import Action from "../../type_action";
import ActiveParameterName from "./enum_ActiveParameterName";

const setActiveParameterList = (payload: ActiveParameterName[]): Action => ({
  type: ActiveParameterListActionsTypes.SET_ACTIVE_PARAMETER_LIST,
  payload,
});

export { setActiveParameterList };
