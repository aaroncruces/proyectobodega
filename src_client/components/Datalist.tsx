import React, { Component } from "react";
import Props_Datalist from "../helpers/type_props_Datalist";
import ActiveParameterName from "../redux/productParameters/activeParameterList/enum_ActiveParameterName";

export default class Datalist<T extends Props_Datalist> extends Component<T> {
  constructor(props) {
    super(props);
  }

  private onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value);
    this.props.updateStoreValueReducer(inputValue);
  };
  private onBlur_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(
      this.props.format_onBlur(event.target.value)
    );
  };

  render() {
    //console.log(this.props.listOfData);
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
            this.props.invalidComparator == undefined ||
            this.props.invalidComparator(this.props.textDatalist) == ""
              ? "form-control"
              : "form-control is-invalid"
          }
          value={this.props.textDatalist}
          onInput={this.onInput_Datalist}
          onBlur={this.onBlur_Datalist}
          disabled={!this.props.enabled}
          list={this.props.name + "-datalistOptions"}
          id={this.props.name + "-iddatalist"}
          placeholder="Busqueda por SKU"
        />
        <datalist id={this.props.name + "-datalistOptions"}>
          {this.props.listOfData.map((data: string | number) => (
            <option value={data} />
          ))}
        </datalist>
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
