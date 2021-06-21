//vendors
import React, { useEffect } from "react";
import replace from "voca/replace";
import capitalize from "voca/capitalize";
import upperCase from "voca/upper_case";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";
import * as currency from "currency.js";

//customs
import "../styles.scss";
import { obtener_lista_productos } from "../server";
import { Errores_ingreso } from "../../src_servidor/tipos/Errores_ingreso";
import Producto from "../../src_servidor/tipos/Producto";

const Modificacion_Producto = () => {
  //let lista_productos_disponibles: Producto[];

  const [lista_productos, set_lista_productos] = React.useState([]);
  /**
   * En primer render, se llena la lista de productos
   */
  useEffect(() => {
    (async () => {
      const lista_productos_disponibles: Producto[] =
        await obtener_lista_productos();
      set_lista_productos(lista_productos_disponibles);
    })();

    // TODO: LLENAR LISTA DE PRODUCTOS
    console.log("hola");
  }, []);

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
    set_sku(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_sku = (evento: React.ChangeEvent<HTMLInputElement>) => {
    //evento.target.id para la id del cuadro de texto
    //evento.target.value para el texto
    set_sku(upperCase(evento.target.value));
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
    set_codigo_barras(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_codigo_barras = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_codigo_barras(upperCase(evento.target.value));
  };

  /** Controlando Modelo */

  //TODO: capitalizar apripiadamente. borrar doble espacios, tabs y puntos
  const [modelo, set_modelo] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_modelo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_modelo(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_modelo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_modelo(capitalize(lowerCase(evento.target.value)));
  };

  /** Controlando Cantidad */
  const [cantidad, set_cantidad] = React.useState(0);

  /**
   * Se activa al escribir datos en el cuadro.
   * Admite solo numeros enteros positivos
   * @param evento
   */
  const on_input_cantidad = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_cantidad(Number.parseInt(replace(evento.target.value, /\D/g, "")) || 0);
  };

  /** Controlando Ubicacion */
  const [ubicacion, set_ubicacion] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_ubicacion = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_ubicacion(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_ubicacion = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_ubicacion(capitalize(lowerCase(evento.target.value)));
  };

  /** Controlando Marca */
  const [marca, set_marca] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_marca = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_marca(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_marca = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_marca(capitalize(lowerCase(evento.target.value)));
  };

  /** Controlando Precios
   * Actualmente incapaz de manejar decimales
   */
  const [precio_venta_neto, set_precio_venta_neto] = React.useState(0);

  /**
   * Se activa al escribir datos en el cuadro.
   * Admite solo numeros enteros positivos
   * @param evento
   */
  const on_input_precio_venta_neto = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_precio_venta_neto(
      Number.parseInt(replace(evento.target.value, /\D/g, "")) || 0
    );
  };

  /**
   * Se activa al escribir datos en el cuadro.
   * Admite solo numeros enteros positivos
   * Calcula  el PVNeto a pertir del PVBruto
   * @param evento
   */
  const on_input_precio_venta_bruto = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_precio_venta_neto(
      Number.parseInt(replace(evento.target.value, /\D/g, "")) * 1.19 || 0
    );
  };

  /** Controlando Descripcion */
  const [descripcion, set_descripcion] = React.useState("");
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * @param evento
   */
  const on_blur_descripcion = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_descripcion(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_descripcion = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    set_descripcion(capitalize(lowerCase(evento.target.value)));
  };

  const borrar_formulario = () => {
    set_sku("");
    set_codigo_barras("");
    set_modelo("");
    set_cantidad(0);
    set_ubicacion("");
    set_marca("");
    set_precio_venta_neto(0);
    set_descripcion("");
  };

  //!---------------------------------------------------------

  /** Elejir entre busqueda y modificacion */
  enum Modos {
    BUSQUEDA,
    MODIFICACION,
  }
  const [modo, set_modo] = React.useState(Modos.BUSQUEDA);
  //!---------------------------------------------------------
  /**
   * Este boton activa la modificacion del producto,
   * y envia los cambios a la DB.
   * @param evento
   */
  const on_click_modificar_producto = async (
    evento: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (modo == Modos.BUSQUEDA) {
      set_modo(Modos.MODIFICACION);
    }
  };
  /**
   * Este boton borra el formulario,
   * y activa el modo de busqueda
   * @param evento
   */
  const on_click_borrar_formulario = (
    evento: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (modo == Modos.MODIFICACION) {
      set_modo(Modos.BUSQUEDA);
    }
    borrar_formulario();
  };
  return (
    <>
      <div className="card mx-5 my-5">
        <div className="card-body">
          <form className="container">
            <h5 className="card-title">
              {modo == Modos.BUSQUEDA
                ? "Buscar Producto"
                : "Modificar Producto"}
            </h5>
            <div className="row mb-3">
              <div className="col-md-4" id="sku-textbox">
                <label htmlFor="sku" className="form-label">
                  SKU
                </label>
                <input
                  name="sku"
                  type="text"
                  className="form-control"
                  value={sku}
                  onInput={on_input_sku}
                  onBlur={on_blur_sku}
                  disabled={modo == Modos.MODIFICACION}
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
                  className="form-control"
                  value={modelo}
                  onInput={on_input_modelo}
                  onBlur={on_blur_modelo}
                />
              </div>
            </div>

            <div className="row  mb-3">
              <div className="col-md-4 form-group" id="cantidad-textbox">
                <label htmlFor="cantidad" className="form-label">
                  Cantidad
                </label>
                <input
                  name="cantidad"
                  type="text"
                  className="form-control"
                  value={currency(cantidad, {
                    symbol: "",
                    decimal: ",",
                    separator: ".",
                    precision: 0,
                  }).format()}
                  onInput={on_input_cantidad}
                />
              </div>
              <div className="col-md-4 form-group" id="ubicacion-textbox">
                <label htmlFor="ubicacion" className="form-label">
                  Ubicacion
                </label>
                <input
                  name="ubicacion"
                  type="text"
                  className="form-control"
                  value={ubicacion}
                  onInput={on_input_ubicacion}
                  onBlur={on_blur_ubicacion}
                />
              </div>
              <div className="col-md-4 form-group" id="marca-textbox">
                <label htmlFor="marca" className="form-label">
                  Marca
                </label>
                <input
                  name="marca"
                  type="text"
                  className="form-control"
                  value={marca}
                  onInput={on_input_marca}
                  onBlur={on_blur_marca}
                />
              </div>
            </div>

            <div className="row  mb-3">
              <div
                className="col-md-5 form-group"
                id="precio_venta_neto-textbox"
              >
                <label htmlFor="precio_venta_neto" className="form-label">
                  Precio de venta neto
                </label>
                <input
                  name="precio_venta_neto"
                  type="text"
                  className="form-control"
                  value={currency(precio_venta_neto, {
                    symbol: "$ ",
                    decimal: ",",
                    separator: ".",
                    precision: 0,
                  }).format()}
                  onInput={on_input_precio_venta_neto}
                />
              </div>
              <div className="col-md-2 form-group" id="iva-textbox">
                <label htmlFor="iva" className="form-label">
                  IVA
                </label>
                <input
                  name="iva"
                  type="text"
                  className="form-control "
                  disabled
                  value={currency((precio_venta_neto / 1.19) * 0.19, {
                    symbol: "$ ",
                    decimal: ",",
                    separator: ".",
                    precision: 0,
                  }).format()}
                />
              </div>
              <div
                className="col-md-5 form-group"
                id="precio_venta_bruto-textbox"
              >
                <label htmlFor="precio_venta_bruto" className="form-label">
                  Precio de venta bruto
                </label>
                <input
                  name="precio_venta_bruto"
                  type="text"
                  className="form-control"
                  value={currency(precio_venta_neto / 1.19, {
                    symbol: "$ ",
                    decimal: ",",
                    separator: ".",
                    precision: 0,
                  }).format()}
                  onInput={on_input_precio_venta_bruto}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-12 form-group" id="descripcion-textbox">
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <input
                  name="descripcion"
                  type="text"
                  className="form-control"
                  value={descripcion}
                  onInput={on_input_descripcion}
                  onBlur={on_blur_descripcion}
                />
              </div>
            </div>

            <button
              className="me-3 mt-3 btn btn-primary"
              type="button"
              disabled={false}
              onClick={on_click_modificar_producto}
            >
              {modo == Modos.BUSQUEDA
                ? "Modificar este producto"
                : "Guardar cambios"}
            </button>
            {
              // <button
              //   className="me-3 mt-3 btn btn-primary"
              //   type="button"
              //   disabled={sku == "" || modelo == ""}
              //   onClick={on_click_ingresar_producto}
              // >
              //   Ingresar Producto (indicar cuando falta un dato)
              // </button>
            }
            <button
              className="me-3 mt-3 btn btn-secondary"
              type="button"
              disabled={
                false
                //   sku == "" &&
                //   codigo_barras == "" &&
                //   modelo == "" &&
                //   cantidad == 0 &&
                //   ubicacion == "" &&
                //   marca == "" &&
                //   precio_venta_neto == 0 &&
                //   descripcion == ""
              }
              onClick={on_click_borrar_formulario}
            >
              {modo == Modos.BUSQUEDA ? "Borrar formulario" : "Volver a buscar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Modificacion_Producto;
