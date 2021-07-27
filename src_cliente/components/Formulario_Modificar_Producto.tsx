// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Throbber from "./Throbber";
// helpers & utilities
import Props_Formulario_Ingreso from "../helpers/type_props_Formulario";
// redux custom
import { fetchListaProductos } from "../redux/listaProductos/listaProductosActionCreators";
import { listaProductosFromState } from "../redux/StateValueExtractor";
import Datalist_sku from "./Datalist_sku";

class Formulario_Modificar_Producto extends Component<Props_Formulario_Ingreso> {
  constructor(props) {
    super(props);
    //Cargando los productos de la db a la store
    this.props.fetchListaProductos();
  }

  render() {
    const propsButtonIngreso = {
      className: "me-3 mt-3 btn btn-primary",
    };
    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Datalist_sku cssClassContainer="col-md-4 form-group" />

            {this.props.listaProductosDB === undefined && (
              <div className="ms-auto">
                <Throbber />
              </div>
            )}
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Formulario_Ingreso => ({
  listaProductosDB: listaProductosFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Formulario_Ingreso => ({
  //thunk
  fetchListaProductos: () => dispatch(fetchListaProductos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formulario_Modificar_Producto);
