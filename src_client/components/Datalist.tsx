import React, { Component } from "react";
import Product from "../../src_server/types/Product";
import Props_Datalist from "../helpers/type_props_Datalist";

type StateDatalist = {
  invalidMessage: string;
  listOfData: string[] | number[];
};

export default class Datalist extends Component<Props_Datalist, StateDatalist> {
  constructor(props) {
    super(props);
    this.state = {
      invalidMessage: "",
      listOfData: [1, 2, 3, 4],
    };
  }

  onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);
  };
  onBlur_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateParameterStoreReducer(
      this.props.format_onBlur(event.target.value)
    );
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
          disabled={!this.props.enabled}
          list={this.props.name + "-datalistOptions"}
          id={this.props.name + "-iddatalist"}
          placeholder=""
        />
        <datalist id={this.props.name + "-datalistOptions"}>
          {this.state.listOfData.map((data: string | number) => (
            <option value={data} />
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
