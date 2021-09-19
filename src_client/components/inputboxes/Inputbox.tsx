import React, { Component, KeyboardEventHandler } from "react";
import Props_inputbox from "../prop_types/type_props_Inputbox";

export default class Inputbox<T extends Props_inputbox> extends Component<T> {
  constructor(props) {
    super(props);
  }

  private onInput_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(
      this.props.format_onInput(event.target.value)
    );
    this.props.execOnInput?.(event);
  };
  private onBlur_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(
      this.props.format_onBlur(event.target.value)
    );
  };
  private onClick_Inputbox = () => {
    this.props.execOnclick?.();
  };
  private onKeyDown_Inputbox = (event: React.KeyboardEvent<any>) => {
    this.props.execOnKeyDown?.(event);
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
          type={this.props.type || "text"}
          className={
            this.props.invalidComparator == undefined ||
            this.props.invalidComparator(this.props.textInputBox.toString()) ==
              ""
              ? "form-control"
              : "form-control is-invalid"
          }
          value={this.props.textInputBox}
          onInput={this.onInput_Inputbox}
          onBlur={this.onBlur_Inputbox}
          onClick={this.onClick_Inputbox}
          onKeyDown={this.onKeyDown_Inputbox}
          disabled={this.props.disabled}
        />
        {this.props.invalidComparator != undefined &&
          this.props.invalidComparator(this.props.textInputBox.toString()) !=
            "" && (
            <div className="invalid-feedback">
              {this.props.invalidComparator(this.props.textInputBox.toString())}
            </div>
          )}
      </div>
    );
  }
}
