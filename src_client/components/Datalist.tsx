import React, { Component } from "react";
import {
  execOnBlur,
  execOnFocus,
  execOnInput,
} from "../helpers/datalist_commons";
import Props_Datalist from "../helpers/type_props_Datalist";
import State_Datalist from "../helpers/type_State_Datalist";

export default class Datalist extends Component<
  Props_Datalist,
  State_Datalist
> {
  constructor(props) {
    super(props);
    this.state = {
      invalidMessage: "",
      placeholder: "",
    };
  }

  onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);

    this.setState({
      ...this.state,
      invalidMessage: "",
    });
    execOnInput(
      this.props,
      inputValue.toString(),
      this.state,
      this.setState.bind(this)
    );
  };
  onBlur_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onBlur(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);
    execOnBlur(this.props, inputValue.toString(), this.state, this.setState);
  };
  onFocus_Datalist = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onBlur(event.target.value);
    execOnFocus(this.props, inputValue.toString());
  };
  render() {
    return (
      <div
        className={this.props.cssClassContainer}
        id={this.props.name + "-datalist"}
      >
        <label htmlFor={this.props.name} className="form-label">
          {this.props.labelBody}
        </label>
        <input
          name={this.props.name}
          type="text"
          className={
            this.state.invalidMessage == ""
              ? "form-control"
              : "form-control is-invalid"
          }
          value={this.props.textCurrentParam}
          onInput={this.onInput_Datalist}
          onBlur={this.onBlur_Datalist}
          onFocus={this.onFocus_Datalist}
          disabled={!this.props.enabled}
          list={this.props.name + "-datalistOptions"}
          id={this.props.name + "-iddatalist"}
          placeholder={this.state.placeholder}
        />
        <datalist id={this.props.name + "-datalistOptions"}>
          {this.props.listOfData.map((data: string | number, index) => (
            <option key={index} value={data} />
          ))}
        </datalist>
        {this.state.invalidMessage != undefined &&
          this.state.invalidMessage != "" && (
            <div className="invalid-feedback">{this.state.invalidMessage}</div>
          )}
      </div>
    );
  }
}
