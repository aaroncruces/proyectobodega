import React, { Component } from "react";

import { connect } from "react-redux";

export class Button_Ingreso_Productos extends Component {
  render() {
    return <button>le boton</button>;
  }
}
/*
<button
              className={
                sku != "" && modelo != ""
                  ? "me-3 mt-3 btn btn-primary"
                  : "me-3 mt-3 btn btn-danger"
              }
              type="button"
              disabled={sku == "" || modelo == ""}
              onClick={on_click_ingresar_producto}
            >
              {sku != "" && modelo != ""
                ? "Ingresar Producto"
                : sku == "" && modelo != ""
                ? "Ingrese SKU "
                : sku != "" && modelo == ""
                ? "Ingrese Modelo"
                : "Ingrese SKU y Modelo"}
            </button>
*/
const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Button_Ingreso_Productos);
