import React, { Component } from "react";
import "../../styles.scss";
import { obtener_lista_productos } from "../../server";
import Producto from "../../../src_servidor/tipos/Producto";

export default class Datalist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // lista_productos: [],
    };
  }
  componentDidMount() {
    // obtener_lista_productos().then((lista_productos: Producto[]) => {
    //   this.setState({ lista_productos });
    // });
  }

  render() {
    return (
      <>
        {
          // //@ts-ignore
          // this.state.lista_productos.map((producto: Producto) => {
          //   return (
          //     <>
          //       <h2>sku</h2> <h3>{producto.sku}</h3>
          //     </>
          //   );
          // })
        }
      </>
    );
  }
}
