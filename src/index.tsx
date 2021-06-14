//vendors
import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Voca from "voca";
import * as Currency from "currency.js";
import Producto from "./Producto";
import productos from "./listaProductos";
import lista from "./listaProductos";
import * as Server from "./server";

// TODO:
//  ->Verificar que sku sea unica (al hacer ingreso de product
const FormularioIngresoProductos = () => {
  //--------------------------------Control inputs--------------------------------
  // Definiendo variables de un producto
  // No se define un unico objeto porque React no vigila los valores internos de este

  /** Controlando SKU */
  const [sku, set_sku] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * Debe verificar que haya texto
   * @param evento
   */
  const on_blur_sku = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_sku(Voca.trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_sku = (evento: React.ChangeEvent<HTMLInputElement>) => {
    //evento.target.id para la id del cuadro de texto
    //evento.target.value para el texto
    set_sku(Voca.upperCase(evento.target.value));
  };

  /** Controlando Codigo de barras */
  const [codigo_barras, set_codigo_barras] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_codigo_barras = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_codigo_barras(Voca.trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_codigo_barras = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_codigo_barras(Voca.upperCase(evento.target.value));
  };

  /** Controlando Modelo */
  const [modelo, set_modelo] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_modelo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_modelo(Voca.trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_modelo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_modelo(Voca.capitalize(evento.target.value));
  };

  /** Controlando Cantidad */
  const [cantidad, set_cantidad] = React.useState("0");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_cantidad = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_cantidad(Voca.trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_cantidad = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_cantidad(Voca.capitalize(evento.target.value));
  };
  const [ubicacion, set_ubicacion] = React.useState("");
  const [marca, set_marca] = React.useState("");
  const [precio_venta_neto, set_precio_venta_neto] = React.useState(0);
  //const [iva, set_iva] = React.useState(0);
  //const [precio_venta_bruto, set_precio_venta_bruto] = React.useState(0);
  const [descripcion, set_descripcion] = React.useState("");

  return (
    <>
      <form className="container">
        <div className="row">
          <div className="col-md-4 form-group" id="sku-textbox">
            <label htmlFor="sku" className="form-label">
              SKU-
            </label>
            <input
              name="sku"
              type="text"
              className={
                // Indicando si sku es invalido
                sku == "" ? "form-control is-invalid" : "form-control"
              }
              value={sku}
              onInput={on_input_sku}
              onBlur={on_blur_sku}
            />
          </div>
          <div className="col-md-3 form-group" id="codigo_barras-textbox">
            <label htmlFor="codigo_barras" className="form-label">
              Codigo de barras
            </label>
            <input
              name="codigo_barras"
              type="text"
              className="form-control"
              value={codigo_barras}
              onInput={on_input_codigo_barras}
              onBlur={on_blur_codigo_barras}
            />
          </div>
          <div className="col-md-5 form-group" id="modelo-textbox">
            <label htmlFor="modelo" className="form-label">
              Modelo / Nombre
            </label>
            <input
              name="modelo"
              type="text"
              className={
                // Indicando si sku es invalido
                modelo == "" ? "form-control is-invalid" : "form-control"
              }
              value={modelo}
              onInput={on_input_modelo}
              onBlur={on_blur_modelo}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 form-group" id="cantidad-textbox">
            <label htmlFor="cantidad" className="form-label">
              Cantidad
            </label>
            <input name="cantidad" type="text" className="form-control" />
          </div>
          <div className="col-md-4 form-group" id="ubicacion-textbox">
            <label htmlFor="ubicacion" className="form-label">
              Ubicacion
            </label>
            <input name="ubicacion" type="text" className="form-control" />
          </div>
          <div className="col-md-4 form-group" id="marca-textbox">
            <label htmlFor="marca" className="form-label">
              Marca
            </label>
            <input name="marca" type="text" className="form-control" />
          </div>
        </div>

        <div className="row">
          <div className="col-md-5 form-group" id="precio_venta_neto-textbox">
            <label htmlFor="precio_venta_neto" className="form-label">
              Precio de venta neto
            </label>
            <input
              name="precio_venta_neto"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-md-2 form-group" id="iva-textbox">
            <label htmlFor="iva" className="form-label">
              IVA
            </label>
            <input name="iva" type="text" className="form-control" />
          </div>
          <div className="col-md-5 form-group" id="precio_venta_bruto-textbox">
            <label htmlFor="precio_venta_bruto" className="form-label">
              Precio de venta bruto
            </label>
            <input
              name="precio_venta_bruto"
              type="text"
              className="form-control"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 form-group" id="descripcion-textbox">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <input name="descripcion" type="text" className="form-control" />
          </div>
        </div>
        <button className="me-3 mt-3 btn btn-primary" type="button">
          Ingresar Producto
        </button>
        <button className="me-3 mt-3 btn btn-secondary" type="button">
          Borrar formulario
        </button>
      </form>
    </>
  );
};

ReactDOM.render(
  <FormularioIngresoProductos />,
  document.getElementById("root")
);
/**
 * Definiendo input boxes
 */
