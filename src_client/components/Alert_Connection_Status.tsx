import React, { Component } from "react";
import { delay } from "../helpers/delay";
import Props_Alert_Connection_Status from "./prop_types/type_Props_Alert_Connection_Status";

export default class Alert_Connection_Status extends Component<Props_Alert_Connection_Status> {
  render() {
    delay(2).then(() => {});
    return (
      <div className="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
    );
  }
}
