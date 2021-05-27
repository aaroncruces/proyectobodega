//vendors
import * as React from "react";
import * as ReactDOM from "react-dom";

import productos from "./listaProductos";

const FormularioTEU = () => {
  //inicializo el "productoEncontrado" como undefined (sin parametros en useState()),
  //y obtengo el handler (setProducto) para asignar el producto (productoEncontrado)
  const [productoEncontrado, setProducto] = React.useState();

  //por cada cambio en el input de Codigo de Barras, busco el producto ingresado
  const onInputCodigobarras = (evento: React.ChangeEvent<HTMLInputElement>) => {
    //busco el producto por su codigo de barra en la lista de "productos"
    const producto = productos.find(
      (producto) => producto.codigo == evento.target.value
    );
    //@ts-ignore porque puede entregar un indefinido (un producto vacio)
    setProducto(producto);
    console.log(producto);
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
            onInput={onInputCodigobarras}
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
            //@ts-ignore porque puede entregar un indefinido (un producto vacio)
            value={productoEncontrado ? productoEncontrado.nombre : ""}
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
      <table>
        <tr>
          <th>codigo</th>
          <th>nombre</th>
          <th>descripcion</th>
          <th>precioBruto</th>
          <th>cantidad</th>
        </tr>
        {
          //iterando por cada producto
          productos.forEach((producto) => {
            return (
              <tr>
                <td>producto.codigo</td>
                <td>producto.nombre</td>
                <td>producto.descripcion</td>
                <td>producto.precioBruto</td>
                <td>producto.cantidad</td>
              </tr>
            );
          })
        }
      </table>
    </>
  );
};

ReactDOM.render(<FormularioTEU />, document.getElementById("root"));
/**
 * Definiendo input boxes
 */
