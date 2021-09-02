import ConnectionStatusTypes from "./enumConnectionStatusTypes";

type StateConnectionStatus = {
  connectionStatus: ConnectionStatusTypes;
  connectionMessage: string;
};
export default StateConnectionStatus;
