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
import { obtener_lista_productos } from "../../server";
import { Errores_ingreso } from "../../../src_servidor/tipos/Errores_ingreso";
import Producto from "../../../src_servidor/tipos/Producto";
import Datalist from "./Datalist";
let valor1 = "valor1";
//todo: unificar componentes para css grid o bootstrap
const Modificacion_Producto = () => {
  let valor1 = "valor2";
  const [lista_productos_disponibles, set_lista_productos_disponibles] =
    React.useState([]);
  const [lista_productos_seleccionables, set_lista_productos_seleccionables] =
    React.useState([]);
  /**
   * En primer render, se llena la lista de productos
   */
  useEffect(() => {
    // Se obtienen los productos
    const fetchear = async () => {
      const lista_productos: Producto[] = await obtener_lista_productos();
      set_lista_productos_disponibles(lista_productos);
      set_lista_productos_seleccionables(lista_productos);
    };
    fetchear();
  }, []);
  //--------------------------------Control inputs--------------------------------
  // Definiendo variables de un producto
  // No se define un unico objeto porque React no vigila los valores internos de este
  /*
Estados posibles:
  todo: autocomplete (?)

  ! Se asumen 2 solo niveles de busqueda. datalist filtra y autocompleta

0) todos los campos en blanco
  lista_productos_seleccionables=lista_productos_disponibles
  campos activos: solo campos alfanumericos
  campos activos = Estado:NORMAL (default)

escribo en campo:
  1) no encontrado (a medida que vaya escribiendo el producto):
    A) lista_productos_seleccionables completa (producto aun no buscado, o busqueda mal hecha)
      estado campo escrito:INCORRECTO (hasta que lo encuentre)
      borrar otros campos (asumiendo que la busqueda anterior era erronea)
    B) lista_productos_seleccionables parcial (busqueda previa exitosa, buscando por otra categoria)
      I) 1 solo producto en esta datalist (estado:correcto) 
        se asume que se quiere borrar el producto, para realizar otra busqueda
        reiniciar lista_productos_seleccionables (para la seleccion de nuevos productos)
          rellenar listas de datalists (lista_sku, lista_modelo etc) (gatillado al reiniciar la lista)
        borrar todos los campos
        estado de todos los campos: NORMAL
      II) multiples productos en esta datalist (estado:multiple)
        se asume que se quiere filtrar el producto para reducir la cantidad de opciones, o encontrar el producto
        estado campo escrito:INCORRECTO (hasta que lo encuentre)
    siempre:
      on blur, on input despues de x segundos
        borrar este campo
        estado: normal

  2) encontrado (cuando justo escribo el string, o selecciono de la datalist):
    siempre:
      filtrar lista_productos_seleccionables
      rellenar listas de datalists (lista_sku, lista_modelo etc)
      estado campos con 1 solo datalist:CORRECTO
      estado campos con multiples datalists: MULTIPLE
    A) multiples productos encontrados
      "Se han encontrado X productos"
      alerta: elija otro campo para filtrar el producto
    B) 1 producto encontrado
      "Producto encontrado"

  todo: lista de productos disponibles seleccionables
  todo: indicar si no hay productos, server error, u otros errores
*/
  // Cada estado y hook es definido aquí,
  // ya que pueden ser intervenidos por el resto de eventos (de cada campo).
  const [sku, set_sku] = React.useState("");
  const [codigo_barras, set_codigo_barras] = React.useState("");
  const [modelo, set_modelo] = React.useState("");
  const [cantidad, set_cantidad] = React.useState(0);
  const [ubicacion, set_ubicacion] = React.useState("");
  const [marca, set_marca] = React.useState("");
  const [precio_venta_neto, set_precio_venta_neto] = React.useState(0);
  const [descripcion, set_descripcion] = React.useState("");
  enum Estado_Campo {
    NORMAL,
    CORRECTO,
    MULTIPLE,
    INCORRECTO,
  }
  const [estado_sku, set_estado_sku] = React.useState(Estado_Campo.NORMAL);
  const [estado_codigo_barras, set_estado_codigo_barras] = React.useState(
    Estado_Campo.NORMAL
  );
  const [estado_modelo, set_estado_modelo] = React.useState(
    Estado_Campo.NORMAL
  );
  const [estado_cantidad, set_estado_cantidad] = React.useState(
    Estado_Campo.NORMAL
  );
  const [estado_ubicacion, set_estado_ubicacion] = React.useState(
    Estado_Campo.NORMAL
  );
  const [estado_marca, set_estado_marca] = React.useState(Estado_Campo.NORMAL);
  const [estado_precio_venta_neto, set_estado_precio_venta_neto] =
    React.useState(Estado_Campo.NORMAL);
  const [estado_descripcion, set_estado_descripcion] = React.useState(
    Estado_Campo.NORMAL
  );
  const [lista_sku, set_lista_sku] = React.useState([]);
  const [lista_codigo_barras, set_lista_codigo_barras] = React.useState([]);
  const [lista_modelo, set_lista_modelo] = React.useState([]);
  const [lista_ubicacion, set_lista_ubicacion] = React.useState([]);
  const [lista_marca, set_lista_marca] = React.useState([]);
  const [lista_descripcion, set_lista_descripcion] = React.useState([]);
  /**
   * cada vez que se llena la lista de productos seleccionables,
   * se llenan las listas para los datasets, para poder seleccionar el elemento
   */
  useEffect(() => {
    //lista unica de SKU, no hay sku repetidos
    set_lista_sku(
      lista_productos_seleccionables.map((producto) => producto.sku)
    );
    // set_lista_sku([
    //   ...new Set(
    //     lista_productos_seleccionables.map((producto) => producto.sku)
    //   ),
    // ]);
  }, [lista_productos_seleccionables]);

  /** Elejir entre busqueda y modificacion */
  enum Modos {
    BUSQUEDA,
    MODIFICACION,
  }
  const [modo, set_modo] = React.useState(Modos.BUSQUEDA);

  const borrar_formulario = () => {
    set_sku("");
    set_estado_sku(Estado_Campo.NORMAL);
    set_codigo_barras("");
    set_estado_codigo_barras(Estado_Campo.NORMAL);
    set_modelo("");
    set_estado_modelo(Estado_Campo.NORMAL);
    set_cantidad(0);
    set_ubicacion("");
    set_estado_ubicacion(Estado_Campo.NORMAL);
    set_marca("");
    set_estado_marca(Estado_Campo.NORMAL);
    set_precio_venta_neto(0);
    set_descripcion("");
    set_estado_descripcion(Estado_Campo.NORMAL);
  };

  /** Controlando SKU */
  /**
   * Se activa al des-seleccionar el cuadro de texto
   * Detecto si se ha escrito un SKU que no existe, o vacio
   * @param evento
   */
  const on_blur_sku = (evento: React.ChangeEvent<HTMLInputElement>) => {
    /*

0) todos los campos en blanco
  lista_productos_seleccionables=lista_productos_disponibles
  campos activos: solo campos alfanumericos
  campos activos = Estado:NORMAL (default)

escribo en campo:
  1) no encontrado (a medida que vaya escribiendo el producto):
    A) lista_productos_seleccionables completa (producto aun no buscado, o busqueda mal hecha)
      estado campo escrito:INCORRECTO (hasta que lo encuentre)
      borrar otros campos (asumiendo que la busqueda anterior era erronea)
    B) lista_productos_seleccionables parcial (busqueda previa exitosa, buscando por otra categoria)
      I) 1 solo producto en esta datalist (estado:correcto) 
        se asume que se quiere borrar el producto, para realizar otra busqueda
        reiniciar lista_productos_seleccionables (para la seleccion de nuevos productos)
          rellenar listas de datalists (lista_sku, lista_modelo etc) (gatillado al reiniciar la lista)
        borrar todos los campos
        estado de todos los campos: NORMAL
      II) multiples productos en esta datalist (estado:multiple)
        se asume que se quiere filtrar el producto para reducir la cantidad de opciones, o encontrar el producto
        estado campo escrito:INCORRECTO (hasta que lo encuentre)
    siempre:
      on blur, on input despues de x segundos
        borrar este campo
        estado: normal

  2) encontrado (cuando justo escribo el string, o selecciono de la datalist):
    siempre:
      filtrar lista_productos_seleccionables
      rellenar listas de datalists (lista_sku, lista_modelo etc)
      estado campos con 1 solo datalist:CORRECTO
      estado campos con multiples datalists: MULTIPLE
    A) multiples productos encontrados
      "Se han encontrado X productos"
      alerta: elija otro campo para filtrar el producto
    B) 1 producto encontrado
      "Producto encontrado"

  todo: lista de productos disponibles seleccionables
  todo: indicar si no hay productos, server error, u otros errores
    */
    set_sku(trim(evento.target.value));
  };
  /**
   * Se activa al escribir datos en el cuadro.
   * @param evento
   */
  const on_input_sku = (evento: React.ChangeEvent<HTMLInputElement>) => {
    //evento.target.id para la id del cuadro de texto
    //evento.target.value para el texto
    const sku_escrito: string = upperCase(evento.target.value);
    set_sku(upperCase(evento.target.value));
    //al borrar, puedo entrar en estado 0
    //dado que SKU es unico, y no pude ser modificado en modo MODIFICACION
    //
    if (trim(sku_escrito) == "") {
      set_estado_sku(Estado_Campo.NORMAL);
    }

    if (lista_sku.find((sku) => sku == sku_escrito)) return;
  };

  /** Controlando Codigo de barras */
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

  /**
   * Se activa al escribir datos en el cuadro.
   * Admite solo numeros enteros positivos
   * @param evento
   */
  const on_input_cantidad = (evento: React.ChangeEvent<HTMLInputElement>) => {
    set_cantidad(Number.parseInt(replace(evento.target.value, /\D/g, "")) || 0);
  };

  /** Controlando Ubicacion */

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
                  {estado_sku == Estado_Campo.NORMAL
                    ? "SKU"
                    : Estado_Campo.INCORRECTO
                    ? "SKU no existe"
                    : Estado_Campo.CORRECTO
                    ? "SKU seleccionado"
                    : Estado_Campo.MULTIPLE
                    ? "Varios SKU Disponibles"
                    : ""}
                </label>
                <input
                  name="sku"
                  type="text"
                  className="form-control"
                  value={sku}
                  onInput={on_input_sku}
                  onBlur={on_blur_sku}
                  disabled={modo == Modos.MODIFICACION}
                  list="datalist_sku"
                  placeholder="Ingrese SKU a buscar..."
                />
                <datalist id="datalist_sku">
                  {!lista_productos_disponibles ? (
                    <option value="Cargando..." />
                  ) : (
                    lista_sku.map((sku: string, index: number) => {
                      return <option key={index} value={sku} />;
                    })
                  )}
                </datalist>
              </div>

              <div className="col-md-3 form-group" id="codigo_barras-textbox ">
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
