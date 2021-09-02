import Action from "../type_action";
import ConnectionStatusActionsTypes from "./connectionStatusActionTypes";
import ConnectionStatusTypes from "./enumConnectionStatusTypes";

const setConnectionStatus = (payload: ConnectionStatusTypes): Action => ({
  type: ConnectionStatusActionsTypes.SET_CONNECTION_STATUS,
  payload,
});

const setConnectionMessage = (payload: string): Action => ({
  type: ConnectionStatusActionsTypes.SET_CONNECTION_MESSAGE,
  payload,
});

export { setConnectionStatus, setConnectionMessage };
