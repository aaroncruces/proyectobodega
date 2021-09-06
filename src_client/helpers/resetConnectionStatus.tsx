import {
  setConnectionMessage,
  setConnectionStatus,
} from "../redux/connectionStatus/connectionStatusActionCreators";
import ConnectionStatusTypes from "../redux/connectionStatus/enumConnectionStatusTypes";

export const resetConnectionStatus = (dispatch) => {
  dispatch(setConnectionStatus(ConnectionStatusTypes.CONNECTION_IDLE));
  dispatch(setConnectionMessage(""));
};
