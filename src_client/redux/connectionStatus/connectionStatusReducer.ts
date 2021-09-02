import Action from "../type_action";
import ConnectionStatusActionsTypes from "./connectionStatusActionTypes";
import ConnectionStatusTypes from "./enumConnectionStatusTypes";
import StateConnectionStatus from "./type_state_connectionStatus";

const initialState: StateConnectionStatus = {
  connectionStatus: ConnectionStatusTypes.CONNECTION_IDLE,
  connectionMessage: "",
};
const connectionStatusReducer = (
  state: StateConnectionStatus = initialState,
  action: Action
): StateConnectionStatus =>
  action.type == ConnectionStatusActionsTypes.SET_CONNECTION_STATUS
    ? { ...state, connectionStatus: action.payload }
    : action.type == ConnectionStatusActionsTypes.SET_CONNECTION_MESSAGE
    ? { ...state, connectionMessage: action.payload }
    : { ...state };
export default connectionStatusReducer;
