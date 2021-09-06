import ConnectionStatusTypes from "../../redux/connectionStatus/enumConnectionStatusTypes";

type Props_Alert_Connection_Status = {
  conectionStatus?: ConnectionStatusTypes;
  connectionMessage?: string;
  resetConnectionStatus?: () => any;
};
export default Props_Alert_Connection_Status;
