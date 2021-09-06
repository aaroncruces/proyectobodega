import React, { Component } from "react";
import Props_Alert_Connection_Status from "../helpers/type_Props_Alert_Connection_Status";

export default class Alert_Connection_Status extends Component<Props_Alert_Connection_Status> {
  render() {
    return (
      <button
        className={this.props.cssClass + " me-2"}
        type="button"
        disabled={this.props.invalid}
        onClick={this.props.onClick}
      >
        {this.props.label}
      </button>
    );
  }
}
