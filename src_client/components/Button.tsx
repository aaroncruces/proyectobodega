import React, { Component } from "react";
import Props_Button from "../helpers/type_props_button";

export default class Button extends Component<Props_Button> {
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
