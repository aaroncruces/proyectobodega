import React, { Component } from "react";
import type_Props_Button_Link_Router from "../helpers/type_Props_Button_Link_Router";
import { Link } from "react-router-dom";
export default class Button_Link_Router extends Component<type_Props_Button_Link_Router> {
  render() {
    return (
      <Link
        className={
          this.props.invalid
            ? "btn disabled " + this.props.cssClass
            : "btn " + this.props.cssClass
        }
        type="button"
        disabled={this.props.invalid}
        to={this.props.url}
      >
        {this.props.label}
      </Link>
    );
  }
}
