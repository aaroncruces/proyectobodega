import React, { Component } from "react";
import Props_Datalist from "../helpers/type_props_Datalist";
import Props_inputbox from "../helpers/type_props_Inputbox";

export default class Datalist<T extends Props_Datalist> extends Component<T> {
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
            this.props.invalidComparator(this.props.textDatalist) == ""
              ? "form-control"
              : "form-control is-invalid"
          }
          value={this.props.textDatalist}
          onInput={this.onInput_Inputbox}
          onBlur={this.onBlur_Inputbox}
        />
        {this.props.invalidComparator != undefined &&
          this.props.invalidComparator(this.props.textDatalist) != "" && (
            <div className="invalid-feedback">
              {this.props.invalidComparator(this.props.textDatalist)}
            </div>
          )}
      </div>
    );
  }
}
