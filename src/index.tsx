//vendors
import * as React from "react";
import * as ReactDOM from "react-dom";

import Producto from "./Producto";
import productos from "./listaProductos";

const FormularioTEU = () => {
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

    //busco el producto por su codigo de barra en la lista de "productos"
    const productoEncontrado = productos.find(
      (producto) => producto[key] == evento.target.value
    );

    setProducto(productoEncontrado || productoVacio);
    console.log(productoEncontrado);
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="TextboxCodigobarras" className="form-label">
            Codigo de barras
          </label>
          <input
            type="text"
            className="form-control"
            id="TextboxCodigobarras"
            aria-describedby="DescripcionTextboxCodigobarras"
            onInput={(evento: React.ChangeEvent<HTMLInputElement>) =>
              buscarProductoPor("codigo", evento)
            }
          />
          <div id="DescripcionTextboxCodigobarras" className="form-text">
            Escanee el codigo de barras seleccionando este cuadro
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="TextboxNombreproducto" className="form-label">
            Nombre de producto
          </label>
          <input
            type="text"
            className="form-control"
            id="TextboxNombreproducto"
            onInput={(evento: React.ChangeEvent<HTMLInputElement>) =>
              buscarProductoPor("nombre", evento)
            }
            value={productoActual.nombre}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="TextboxDescripcionproducto" className="form-label">
            Descripcion
          </label>
          <input
            type="text"
            className="form-control"
            id="TextboxDescripcionproducto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="TextboxPreciobruto" className="form-label">
            Precio Bruto
          </label>
          <input
            type="number"
            className="form-control"
            id="TextboxPreciobruto"
            aria-describedby="DescripcionTextboxPreciobruto"
          />
          <div id="DescripcionTextboxPreciobruto" className="form-text">
            Precio sin IVA
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="TextboxIVA" className="form-label">
            IVA
          </label>
          <input
            type="number"
            className="form-control"
            id="TextboxIVA"
            aria-describedby="DescripcionTextboxPreciobruto"
            disabled={true}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="TextboxPrecioneto" className="form-label">
            Precio Neto
          </label>
          <input
            type="number"
            className="form-control"
            id="TextboxPrecioneto"
            aria-describedby="DescripcionTextboxPrecioneto"
          />
          <div id="DescripcionTextboxPrecioneto" className="form-text">
            Precio con IVA
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="TextboxCantidad" className="form-label">
            Cantidad
          </label>
          <input type="number" className="form-control" id="TextboxCantidad" />
        </div>
      </form>
      {
        //debug de la lista de productos actuales guardados
      }
      <table className="table">
        <thead>
          <tr>
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
                  <td>
                    {
                      //se supone que la id debe ser privada, pero es para debug
                      productoIterado.id
                    }
                  </td>
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

ReactDOM.render(<FormularioTEU />, document.getElementById("root"));
/**
 * Definiendo input boxes
 */
