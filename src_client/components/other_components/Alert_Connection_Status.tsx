import React, { Component } from "react";
import { connect } from "react-redux";
import { delay } from "../../helpers/delay";
import { resetConnectionStatus } from "../../helpers/resetConnectionStatus";
import ConnectionStatusTypes from "../../redux/connectionStatus/enumConnectionStatusTypes";
import {
  connectionMessageFromState,
  connectionStatusFromState,
} from "../../redux/StateValueExtractor";
import Props_Alert_Connection_Status from "../prop_types/type_Props_Alert_Connection_Status";

export class Alert_Connection_Status extends Component<Props_Alert_Connection_Status> {
  render() {
    if (this.props.conectionStatus == ConnectionStatusTypes.SUCCESSFUL_FETCH) {
      const alertTime = 2000;
      delay(alertTime).then(() => {
        this.props.resetConnectionStatus();
      });
    }
    return (
      <>
        {this.props.conectionStatus == ConnectionStatusTypes.FETCHING && (
          <div className="alert alert-secondary" role="alert">
            {this.props.connectionMessage}
          </div>
        )}
        {this.props.conectionStatus ==
          ConnectionStatusTypes.SUCCESSFUL_FETCH && (
          <div className="alert alert-success" role="alert">
            {this.props.connectionMessage}
          </div>
        )}
        {this.props.conectionStatus == ConnectionStatusTypes.FAILED_FETCH && (
          <div className="alert alert-danger" role="alert">
            {this.props.connectionMessage}
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Alert_Connection_Status => ({
  conectionStatus: connectionStatusFromState(state),
  connectionMessage: connectionMessageFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Alert_Connection_Status => ({
  resetConnectionStatus: () => resetConnectionStatus(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Alert_Connection_Status);
