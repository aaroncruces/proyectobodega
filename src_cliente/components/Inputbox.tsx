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
  // <T extends Props_inputbox> extends Component<T>
  // es para que tanto Inputbox como sus hijos puedan usar Props_inputbox en typescript
  /**
   * el nombre del campo, debe ser el nombre de la propiedad de un producto o de un campo derivado
   * com sku, codigo_barras, iva, etc
   */
  abstract name: string;
  /**
   * El string que va en el titulo del inputbox, como "Codigo de Barras"
   */
  abstract labelBody: string;

  /**
   * - Funcion que toma lo que se va escribiendo en input en tiemp real,
   * lo formate a especificacion, lo guarda en la store.
   * - Lo que aparezca en input depende de mapStateToProps, y de this.props.textInputBox,
   * no depende de esta funcion
   * - Aunque se espera usar esta funcion para formatear los strings antes de guardarlos
   * en la store mediante mapDispatchToProps
   */
  abstract format_onInput: (text: string) => string | number;
  /**
   * Funcion que toma lo que se ha  escribiendo en input,
   * y lo formatea segun especificaciones
   */
  abstract format_onBlur: (text: string) => string | number;

  constructor(props) {
    super(props);
    // Es posible que el formulario le entregue la funcion comparadora.
    // En este caso, invalidComparator quedará como la nueva funcion.
    // En caso contrario, esta será una funcion placeholder.

    this.state = {
      // el mensaje será "" si no hay comparador,
      // si lo hay, será aquello que pasa cuado el campo se encuentra vacio
      invalidMessage:
        this.props.invalidComparator == undefined
          ? ""
          : this.props.invalidComparator(""),
    };
  }

  /**
   * Ingresa el valor al store
   * @param event contiene el texto del inputbox
   */
  private onInput_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Seteo si el estado es invalido,
    // es posible que no haya funcion comparadora, asi que, el mensaje será "" sempre

    this.props.updateStoreValue(this.format_onInput(event.target.value));
  };
  private onBlur_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValue(this.format_onBlur(event.target.value));
  };

  render() {
    return (
      <div
        className={
          /**
           * Para definir la clase del componente contenedor,
           * por ejemplo, col-md-4 (usando boostrap grid)
           * se pasa mediante props
           */
          this.props.classContainer
        }
        id={this.name + "-textbox"}
      >
        <label htmlFor={this.name} className="form-label">
          {this.labelBody}
        </label>
        <input
          name={this.name}
          type="text"
          className={
            // si el inputbox es correcto
            this.props.invalidComparator == undefined ||
            this.props.invalidComparator(this.props.textInputBox) == ""
              ? "form-control"
              : //si es invalido, tiene un mensaje de invalidez
                "form-control is-invalid"
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
