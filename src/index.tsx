//vendors
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Voca from "voca";
import * as Currency from "currency.js";

import Producto from "./Producto";
import productos from "./listaProductos";
import lista from "./listaProductos";
import * as Database from "./database";

enum RadioButtons {
  BuscarPorCodigo = "BC",
  EditarCodigo = "EC",
  BuscarPorNombre = "BN",
  EditarNombre = "EN",
}
enum TextBox {
  TextboxCodigobarras = "TextboxCodigobarras",
  TextboxNombreproducto = "TextboxNombreproducto",
  TextboxDescripcionproducto = "TextboxDescripcionproducto",
  TextboxPreciobruto = "TextboxPreciobruto",
  TextboxIVA = "TextboxIVA",
  TextboxPrecioneto = "TextboxPrecioneto",
  TextboxCantidad = "TextboxCantidad",
}
//variable debug para ver como cambian los eventos
let numevento = 0;
const Formulario = () => {
  /**
   * En render inicial
   */
  React.useEffect(() => {
    //TODO: usar useRef
    document.getElementById(TextBox.TextboxCodigobarras).focus();
    Database.getListaProductos();
    //console.log(Database.dos);
  }, []);

  //----------------Funcionalidad: Manejo de los Radio buttons----------------//
  /**
   * Cambia de estados los radiobuttons en funcion del diagrama
   * ./diagramas/Formulario.drawio>"Estados RadioButtons"
   *
   * Se asume que un cambio solo puede pasar de disabled-->enabled,
   * y que se parte del estado 1
   *
   * TODO: modificar con useState
   *
   * @param evento un radiobutton con id RadioButtons.elemento
   */
  const onCambiandoRadioButtons = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    // Entro en el estado 1
    if (evento.target.id === RadioButtons.BuscarPorCodigo) {
      (
        document.getElementById(
          RadioButtons.BuscarPorCodigo
        ) as HTMLInputElement
      ).checked = true;
      (
        document.getElementById(RadioButtons.EditarCodigo) as HTMLInputElement
      ).checked = false;
      (
        document.getElementById(
          RadioButtons.BuscarPorNombre
        ) as HTMLInputElement
      ).checked = false;
      (
        document.getElementById(RadioButtons.EditarNombre) as HTMLInputElement
      ).checked = true;
    }
    // Entro en el estado 2
    if (
      evento.target.id === RadioButtons.EditarCodigo ||
      evento.target.id === RadioButtons.EditarNombre
    ) {
      (
        document.getElementById(
          RadioButtons.BuscarPorCodigo
        ) as HTMLInputElement
      ).checked = false;
      (
        document.getElementById(RadioButtons.EditarCodigo) as HTMLInputElement
      ).checked = true;
      (
        document.getElementById(
          RadioButtons.BuscarPorNombre
        ) as HTMLInputElement
      ).checked = false;
      (
        document.getElementById(RadioButtons.EditarNombre) as HTMLInputElement
      ).checked = true;
    }
    // Entro en el estado 3
    if (evento.target.id === RadioButtons.BuscarPorNombre) {
      (
        document.getElementById(
          RadioButtons.BuscarPorCodigo
        ) as HTMLInputElement
      ).checked = false;
      (
        document.getElementById(RadioButtons.EditarCodigo) as HTMLInputElement
      ).checked = true;
      (
        document.getElementById(
          RadioButtons.BuscarPorNombre
        ) as HTMLInputElement
      ).checked = true;
      (
        document.getElementById(RadioButtons.EditarNombre) as HTMLInputElement
      ).checked = false;
    }
  };

  //----------------Funcionalidad: Busqueda de productos----------------//
  //Disgusting hacks:
  //creacion de producto vacio,
  //para evitar la creacion continua de pruductos al modificar los campos de busqueda (al fallar la busqueda)
  //y para mantener los valores de un producto "nuevo"
  //
  const productoNuevo = new Producto();
  //Al actualizar los parametros internos de un objeto, no se causa un re-render.
  //Debo actualizar los valores internos de un objeto apuntando a un objeto dentro de una lista.
  // asi que voy a re-renderizar manualmente usandorerenderizar(rerender + 1);
  //cuando sepa "vigilar" los parametros internos de un objeto, re-factorizo
  const [rerender, rerenderizar] = React.useState(0);
  //para saber si el producto se encuentra o no en la base de datos
  const [esProductoExistente, setEsProductoExistente] = React.useState(false);

  //para manejar el producto a agregar/modificar
  const [productoActual, setProducto] = React.useState(productoNuevo);

  /**
   * Por cada cambio en el input de Codigo de Barras, busco el producto ingresado
   * @param key puede ser  "codigo" (el codigo de barras) o "nombre" (el nombre)
   * @param evento para saber de que inputbox viene el texto
   */
  const onIngresoDatos = (evento: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onIngresoDatos. Evento:", evento.target.id);
    console.log("Numevento:", numevento);
    numevento++;
    //Elementos  temporales,
    //hacerlos partes del componente cuando se sepa cambiar los radiobuttons reactivamente
    const buscarPorCodigo = (
      document.getElementById(RadioButtons.BuscarPorCodigo) as HTMLInputElement
    ).checked;
    const buscarPorNombre = (
      document.getElementById(RadioButtons.BuscarPorNombre) as HTMLInputElement
    ).checked;

    let productoEncontrado: Producto;
    //manejo de busqueda
    if (evento.target.id === TextBox.TextboxCodigobarras && buscarPorCodigo) {
      //realizando busqueda por codigo
      productoEncontrado = productos.find(
        (producto: Producto) => producto["codigo"] == evento.target.value
      );
    }
    if (evento.target.id === TextBox.TextboxNombreproducto && buscarPorNombre) {
      //realizando busqueda por codigo
      productoEncontrado = productos.find(
        (producto: Producto) => producto["nombre"] == evento.target.value
      );
    }
    //si se ha realizado el encuentro de un producto existente el la base de datos, se setea el producto
    if (productoEncontrado) {
      setProducto(productoEncontrado);
      setEsProductoExistente(true);
      return;
    }
    //a partir de este punto no se ha encontrado el valor en la DB

    //al tipear en codigo, si tengo seleccionado "Buscar por codigo" y no encuentro el codigo,
    //asumir que el producto es nuevo (segun diagrama "Estados modificacion codigo")
    if (evento.target.id === TextBox.TextboxCodigobarras && buscarPorCodigo) {
      //ESTO ES IMPORTANTE, ingresarle el codigo inmediatamente al objeto observable por value
      //si no, el textbox se quedará bloqueado
      setProducto({ ...productoNuevo, codigo: evento.target.value });
      setEsProductoExistente(false);
      return;
    }
    //idem con nombre
    if (evento.target.id === TextBox.TextboxNombreproducto && buscarPorNombre) {
      setProducto({ ...productoNuevo, nombre: evento.target.value });
      setEsProductoExistente(false);
      return;
    }
    //En el caso de que no esté buscando, se asume edicion.
    //Corregir valores internos en el "defocus" si las correcciones no pueden ser inmediatas (como trim)
    if (evento.target.id === TextBox.TextboxCodigobarras)
      productoActual.codigo = evento.target.value;

    if (evento.target.id === TextBox.TextboxNombreproducto)
      productoActual.nombre = Voca.capitalize(evento.target.value);

    if (evento.target.id === TextBox.TextboxDescripcionproducto)
      productoActual.descripcion = Voca.capitalize(evento.target.value);

    //se ingresa solo numeros enteros
    //enforzar que sea numerico y que tenga el formato correcto en el jsx
    if (evento.target.id === TextBox.TextboxCantidad)
      productoActual.cantidad =
        Number.parseInt(Voca.replace(evento.target.value, /\D/g, "")) || 0;

    //no deberian haber precios negativos, ni decimales, si los hubiera, habria que cambiar preciobruto:String
    //o algo como una variable aparte, para poder almacenar comas y negativos al final de un string, para poder
    //ingresar mas caracteres despues
    if (evento.target.id === TextBox.TextboxPreciobruto)
      productoActual.precioBruto = Currency(
        Voca.replace(evento.target.value, /[^\d$,.-]/g, ""),
        {
          separator: ".",
          symbol: "$",
          decimal: ",",
          precision: 0,
        }
      ).value;

    if (evento.target.id === TextBox.TextboxPrecioneto)
      productoActual.precioBruto =
        Currency(Voca.replace(evento.target.value, /[^\d$,.-]/g, ""), {
          separator: ".",
          symbol: "$",
          decimal: ",",
          precision: 0,
        }).value / 1.19;

    //Gatillando re-render, ya que no se actualizan las referencias
    //para poder editar directamente en una lista (si el producto actual existe en la lista),
    //y a la vez, para poder editar el producto nuevo
    rerenderizar(rerender + 1);
    //la alternativa seria
    //setProducto({ ...productoActual, codigo: evento.target.value });
    //pero se destruye y genera una nueva referencia, obligandome a re-buscar en la lista de productos
  };

  /**
   * Trimea y capitaliza los textos al hacerles unfocus (donde corresponda)
   * @param evento
   */
  const onCapitalizarTexto = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.id === TextBox.TextboxCodigobarras)
      productoActual.codigo = Voca.trim(evento.target.value);

    if (evento.target.id === TextBox.TextboxNombreproducto)
      productoActual.nombre = Voca.capitalize(Voca.trim(evento.target.value));

    if (evento.target.id === TextBox.TextboxDescripcionproducto)
      productoActual.descripcion = Voca.capitalize(
        Voca.trim(evento.target.value)
      );
    //gatillando re-render
    rerenderizar(rerender + 1);
  };

  const onclickAgregar = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (!esProductoExistente) {
      lista.push(productoActual);
      setProducto(new Producto());
      //gatillando re-render
      rerenderizar(rerender + 1);
    }
  };
  return (
    <>
      <form className="container">
        {
          //fila con Codigo de barras y Nombre de producto
        }
        <div className="row">
          <div className="col-md-4" id="CodigoBarras">
            <label htmlFor="TextboxCodigobarras" className="form-label">
              Codigo de Barras
            </label>
            <input
              type="text"
              className="form-control"
              id={TextBox.TextboxCodigobarras}
              value={productoActual.codigo}
              onInput={onIngresoDatos}
              onBlur={onCapitalizarTexto}
            />

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.BuscarPorCodigo}
                onChange={onCambiandoRadioButtons}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="buscarCodigo">
                Buscar por Codigo
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.EditarCodigo}
                onChange={onCambiandoRadioButtons}
              />
              <label className="form-check-label" htmlFor="editarCodigo">
                Editar Codigo
              </label>
            </div>
          </div>

          <div className="col-md-8" id="Nombre">
            <label htmlFor="TextboxNombreproducto" className="form-label">
              Nombre de producto
            </label>
            <input
              type="text"
              className="form-control"
              id={TextBox.TextboxNombreproducto}
              value={productoActual.nombre}
              onChange={onIngresoDatos}
              onBlur={onCapitalizarTexto}
            />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.BuscarPorNombre}
                onChange={onCambiandoRadioButtons}
              />
              <label className="form-check-label" htmlFor="buscarNombre">
                Buscar por Nombre
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.EditarNombre}
                onChange={onCambiandoRadioButtons}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="editarNombre">
                Editar Nombre
              </label>
            </div>
          </div>
        </div>
        {
          //fila con Descripcion
        }
        <div className="row">
          <div className="col-lg-12" id="Descripcion">
            <label htmlFor="TextboxDescripcionproducto" className="form-label">
              Descripcion
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={productoActual.descripcion}
              id={TextBox.TextboxDescripcionproducto}
              value={productoActual.descripcion}
              onChange={onIngresoDatos}
              onBlur={onCapitalizarTexto}
            />
          </div>
        </div>
        {
          //fila con Codigo de barras y Nombre de producto
        }
        <div className="row">
          <div className="col-md-8 col-lg-4" id="PrecioBruto">
            <label htmlFor="TextboxPreciobruto" className="form-label">
              Precio Bruto
            </label>
            <input
              type="text"
              className="form-control"
              id={TextBox.TextboxPreciobruto}
              value={Currency(productoActual.precioBruto, {
                separator: ".",
                symbol: "$",
                decimal: ",",
                precision: 0,
              }).format()}
              onChange={onIngresoDatos}
            />
            <div id="DescripcionTextboxPreciobruto" className="form-text">
              Precio sin IVA
            </div>
          </div>

          <div className="col-md-4 col-lg-3" id="Iva">
            <label htmlFor="TextboxIVA" className="form-label">
              IVA
            </label>
            <input
              type="text"
              className="form-control"
              disabled={true}
              id={TextBox.TextboxIVA}
              value={Currency(productoActual.precioBruto * 0.19, {
                separator: ".",
                symbol: "$",
                decimal: ",",
                precision: 0,
              }).format()}
              onChange={onIngresoDatos}
            />
          </div>

          <div className="col-md-8 col-lg-4" id="PrecioNeto">
            <label htmlFor="TextboxPrecioneto" className="form-label">
              Precio Neto
            </label>
            <input
              type="text"
              className="form-control"
              aria-describedby="DescripcionTextboxPrecioneto"
              id={TextBox.TextboxPrecioneto}
              value={Currency(productoActual.precioBruto * 1.19, {
                separator: ".",
                symbol: "$",
                decimal: ",",
                precision: 0,
              }).format()}
              onChange={onIngresoDatos}
            />
            <div id="DescripcionTextboxPrecioneto" className="form-text">
              Precio con IVA
            </div>
          </div>

          <div className="col-md-4 col-lg-1" id="Cantidad">
            <label htmlFor="TextboxCantidad" className="form-label">
              Cantidad
            </label>
            <input
              type="text"
              className="form-control"
              id={TextBox.TextboxCantidad}
              value={productoActual.cantidad}
              onChange={onIngresoDatos}
            />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={onclickAgregar}
        >
          {esProductoExistente ? "Modificar Producto" : "Agregar Producto"}
        </button>
      </form>
      {
        //lista de productos actuales guardados
      }

      {productos.length < 1 && <h2>No hay productos guardados</h2>}

      <table className="table">
        <thead>
          {productos.length >= 1 && (
            <tr>
              <th scope="col">id</th>
              <th scope="col">codigo</th>
              <th scope="col">nombre</th>
              <th scope="col">descripcion</th>
              <th scope="col">precioBruto</th>
              <th scope="col">cantidad</th>
            </tr>
          )}
        </thead>
        <tbody>
          {
            //iterando por cada producto
            productos.map((productoIterado, indice) => {
              return (
                <tr
                  key={productoIterado.id}
                  className={
                    //coloreo el producto seleccionado
                    productoIterado === productoActual
                      ? "table-info"
                      : "table-default"
                  }
                >
                  <th scope="row">
                    {
                      //se supone que la id debe ser privada, pero es para debug
                      productoIterado.id
                    }
                  </th>
                  <td>{productoIterado.codigo}</td>
                  <td>{productoIterado.nombre}</td>
                  <td>{productoIterado.descripcion}</td>
                  <td>{productoIterado.precioBruto}</td>
                  <td>{productoIterado.cantidad}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};

ReactDOM.render(<Formulario />, document.getElementById("root"));
/**
 * Definiendo input boxes
 */
