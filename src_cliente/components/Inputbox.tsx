import React, { Component } from "react";
import Props_inputbox from "../helpers/type_props_Inputbox";

/**
 * Definicion de los estados internos de este componente
 * En este caso, si tiene un mensaje de invalidez
 */
type InputboxState = {
  invalidMessage: string;
};
/**
 * - Clase abstracta diseñada para generar distintos tipos de inputboxes.
 * - Se asume que el valor con el que trabaja (textInputBox) es string.
 * - Tambien que el dispatcher (updateStoreVaue) que actualiza este valor es String
 * - Se deriva la responsabilidad de la conversion de estos valores en las clases hijas
 */
export default abstract class Inputbox<
  T extends Props_inputbox
> extends Component<T, InputboxState> {
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

  /**
   * - Si es invalido, deberia entregar la razon de su invalidez.
   * - Esto debe entregarse especificamente en el componente hijo.
   * - En caso de no setearse, el mensaje será "", lo que significa que es válido siempre.
   * - Los mensajes deben setearse onInput, onblur y en el constructor como "".
   * - No creo que sea inteligente hacerlo en componentDidUpdate, debido a posibles loops
   * - string | number es debido a que algunos states de la store son numberstring | number
   */
  invalidComparator: (text: string | number) => string;
  constructor(props) {
    super(props);
    // Es posible que el formulario le entregue la funcion comparadora.
    // En este caso, invalidComparator quedará como la nueva funcion.
    // En caso contrario, esta será una funcion placeholder.
    this.invalidComparator =
      this.props.invalidComparator || ((text: string | number) => "");
    this.state = {
      invalidMessage: this.invalidComparator(this.props.textInputBox),
    };
  }

  /**
   * Ingresa el valor al store
   * @param event contiene el texto del inputbox
   */
  private onInput_Inputbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateStoreValue(this.format_onInput(event.target.value));
    //no quiero usarlo en componentdidupdate, para evitar loops
    this.setState({
      invalidMessage: this.invalidComparator(
        this.format_onInput(event.target.value)
      ),
    });
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
            // si es invalido el IB
            this.state.invalidMessage != ""
              ? "form-control is-invalid"
              : //si no es invalido, o sino existe esta propiedad
                "form-control"
          }
          value={this.props.textInputBox}
          onInput={this.onInput_Inputbox}
          onBlur={this.onBlur_Inputbox}
        />
        {this.state.invalidMessage != "" && (
          <div className="invalid-feedback">{this.state.invalidMessage}</div>
        )}
      </div>
    );
  }
}
