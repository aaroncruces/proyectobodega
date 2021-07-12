import React, { Component } from "react";
import Props_inputbox from "../helpers/type_props_Inputbox";

/**
 * - Clase abstracta diseñada para generar distintos tipos de inputboxes.
 * - Se asume que el valor con el que trabaja (textInputBox) es string.
 * - Tambien que el dispatcher (updateStoreVaue) que actualiza este valor es String
 * - Se deriva la responsabilidad de la conversion de estos valores en las clases hijas
 */
export default abstract class Inputbox<
  T extends Props_inputbox
> extends Component<T> {
  abstract name: string;
  abstract labelBody: string;
  abstract format_onInput: (text: string) => string | number;
  abstract format_onBlur: (text: string) => string | number;

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
    this.props.updateStoreValueReducer(this.format_onInput(event.target.value));
  };
  private onBlur_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValueReducer(this.format_onBlur(event.target.value));
  };

  render() {
    return (
      <div className={this.props.cssClassContainer} id={this.name + "-textbox"}>
        <label htmlFor={this.name} className="form-label">
          {this.labelBody}
        </label>
        <input
          name={this.name}
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
