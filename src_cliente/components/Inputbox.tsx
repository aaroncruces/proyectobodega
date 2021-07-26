import React, { Component } from "react";
import Props_inputbox from "../helpers/type_props_Inputbox";

export default class Inputbox<T extends Props_inputbox> extends Component<T> {
  constructor(props) {
    super(props);
    this.state = {
      invalidMessage:
        this.props.invalidComparator == undefined
          ? ""
          : this.props.invalidComparator(""),
    };
  }

  private onInput_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(
      this.props.format_onInput(event.target.value)
    );
  };
  private onBlur_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(
      this.props.format_onBlur(event.target.value)
    );
  };

  render() {
    return (
      <div
        className={this.props.cssClassContainer}
        id={this.props.name + "-textbox"}
      >
        <label htmlFor={this.props.name} className="form-label">
          {this.props.labelBody}
        </label>
        <input
          name={this.props.name}
          type="text"
          className={
            this.props.invalidComparator == undefined ||
            this.props.invalidComparator(this.props.textInputBox) == ""
              ? "form-control"
              : "form-control is-invalid"
          }
          value={this.props.textInputBox}
          onInput={this.onInput_Inputbox}
          onBlur={this.onBlur_Inputbox}
          disabled={this.props.disabled}
        />
        {this.props.invalidComparator != undefined &&
          this.props.invalidComparator(this.props.textInputBox) != "" && (
            <div className="invalid-feedback">
              {this.props.invalidComparator(this.props.textInputBox)}
            </div>
          )}
      </div>
    );
  }
}
