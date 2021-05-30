//vendors
import * as React from "react";
import * as ReactDOM from "react-dom";

import Producto from "./Producto";
import productos from "./listaProductos";

enum RadioButtons {
  BuscarPorCodigo = "BC",
  EditarCodigo = "EC",
  BuscarPorNombre = "BN",
  EditarNombre = "EN",
}

const Formulario = () => {
  //----------------Funcionalidad: Manejo de los Radio buttons----------------//

  /**
   * Cambia de estados los radiobuttons en funcion del diagrama
   * ./diagramas/Formulario.drawio>"Estados RadioButtons"
   *
   * Se asume que un cambio solo puede pasar de disabled-->enabled,
   * y que se parte del estado 1
   *
   * No se como hacer que React no congele un HTMLInputElement a las modificaciones
   * del usuario, si le doy un valor value={algo}, o checked={algo} en el jsx;
   * Asi que voy a modificar el DOM directamente
   *
   * @param evento un radiobutton con id RadioButtons.elemento
   */
  const cambiandoRadioButtons = (
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(evento.target.id);
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

  //--------Funcionalidad: Busqueda de productos--------//
  //creo producto vacio, ya que no veo maneras de crear variables estaticas de forma elegante
  const productoVacio = new Producto();
  //y obtengo el setter (setProducto) para asignar el producto (productoActual)
  const [productoActual, setProducto] = React.useState(productoVacio);
  /**
   * Por cada cambio en el input de Codigo de Barras, busco el producto ingresado
   * @param key puede ser  "codigo" (el codigo de barras) o "nombre" (el nombre)
   * @param evento para saber de que inputbox viene el texto
   */
  const buscarProductoPor = (
    key: "codigo" | "nombre",
    evento: React.ChangeEvent<HTMLInputElement>
  ) => {
    //para no rehacer el producto cada vez
    //static productoVacio = new Producto();

    //busco el producto por codigo/nombre en la lista de productos
    // evento.target.value representa el valor en el cuadro de texto que se ha llamado
    let productoEncontrado: Producto = productos.find(
      (producto) => producto[key] == evento.target.value
    );
    productoEncontrado = productoEncontrado || productoVacio;
    setProducto(productoEncontrado);
    document
      .getElementById("TextboxNombreproducto")
      .setAttribute("value", productoEncontrado.nombre);
    console.log(productoEncontrado);
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
              Codigo de barras
            </label>
            <input
              type="text"
              className="form-control"
              id="TextboxCodigobarras"
              placeholder="Escanee el codigo de barras"
              onInput={(evento: React.ChangeEvent<HTMLInputElement>) =>
                buscarProductoPor("codigo", evento)
              }
            />

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.BuscarPorCodigo}
                onChange={cambiandoRadioButtons}
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
                onChange={cambiandoRadioButtons}
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
              id="TextboxNombreproducto"
            />
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={RadioButtons.BuscarPorNombre}
                onChange={cambiandoRadioButtons}
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
                onChange={cambiandoRadioButtons}
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
              id="TextboxDescripcionproducto"
              placeholder={productoActual.descripcion}
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
              type="number"
              className="form-control"
              id="TextboxPreciobruto"
              aria-describedby="DescripcionTextboxPreciobruto"
              placeholder={productoActual.precioBruto.toString()}
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
              type="number"
              className="form-control"
              id="TextboxIVA"
              aria-describedby="DescripcionTextboxPreciobruto"
              disabled={true}
              placeholder={(productoActual.precioBruto * 0.19).toString()}
            />
          </div>

          <div className="col-md-8 col-lg-4" id="PrecioNeto">
            <label htmlFor="TextboxPrecioneto" className="form-label">
              Precio Neto
            </label>
            <input
              type="number"
              className="form-control"
              id="TextboxPrecioneto"
              aria-describedby="DescripcionTextboxPrecioneto"
              placeholder={(productoActual.precioBruto * 1.19).toString()}
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
              type="number"
              className="form-control"
              id="TextboxCantidad"
              placeholder={productoActual.cantidad.toString()}
            />
          </div>
        </div>
      </form>
      {
        //debug de la lista de productos actuales guardados
      }
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">codigo</th>
            <th scope="col">nombre</th>
            <th scope="col">descripcion</th>
            <th scope="col">precioBruto</th>
            <th scope="col">cantidad</th>
          </tr>
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
                    productoIterado.id == productoActual.id
                      ? "table-info"
                      : "table-default"
                  }
                >
                  <th scope="rpw">
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
