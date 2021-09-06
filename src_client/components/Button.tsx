import React, { Component } from "react";
import Props_Button from "./prop_types/type_props_button";
import { Link } from "react-router-dom";
export default class Button extends Component<Props_Button> {
  render() {
    return (
      <>
        <Link
          className={
            this.props.invalid
              ? "btn disabled me-2 " + this.props.cssClass
              : "btn me-2 " + this.props.cssClass
          }
          type="button"
          disabled={this.props.invalid}
          to={this.props.url || "#"}
          onClick={this.props.onClick}
        >
          {this.props.label}
        </Link>
      </>
    );
  }
}
