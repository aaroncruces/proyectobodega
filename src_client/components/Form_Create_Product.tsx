// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponents
import Inputbox_sku_Create_Product from "./Inputbox_sku_Create_Product";
import Inputbox_codigo_barras_Create_Product from "./Inputbox_codigo_barras_Create_Product";
import Inputbox_modelo_Create_Product from "./Inputbox_modelo_Create_Product";
import Inputbox_cantidad from "./Inputbox_cantidad";
import Inputbox_ubicacion from "./Inputbox_ubicacion";
import Inputbox_marca_Create_Product from "./Inputbox_marca_Create_Product";
import Inputbox_precio_venta_neto from "./Inputbox_precio_venta_neto";
import Inputbox_precio_venta_bruto from "./Inputbox_precio_venta_bruto";
import Inputbox_iva from "./Inputbox_iva";
import Inputbox_descripcion from "./Inputbox_descripcion";
import Button_Create_Product from "./Button_Create_Product";
import Throbber from "./Throbber";
// helpers & utilities
import Props_Formulario_Ingreso from "../helpers/type_props_Formulario";
// redux custom
import { fetchProductsFromDBToCache } from "../redux/cachedProductList/cachedProductListActionCreators";
import { cachedProductListFromState } from "../redux/StateValueExtractor";
import { resetStoreParamsAndFilteredList } from "../helpers/resetStoreParamsAndFilteredList";
import Button_Reset_form from "./Button_Reset_form";

class Form_Create_Product extends Component<Props_Formulario_Ingreso> {
  constructor(props) {
    super(props);
    this.props.fetchListaProductos();
  }
  //todo on discharge, clear params (sku, CB, Mrca, etc)
  render() {
    const propsButtonIngreso = {
      className: "me-3 mt-3 btn btn-primary",
    };
    this.props.resetParamsAndFilteredLists();
    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_sku_Create_Product cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_codigo_barras_Create_Product cssClassContainer="col-md-3 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_modelo_Create_Product cssClassContainer="col-md-5 form-group" />
          </div>
          <div className="row mb-4">
            {/*//@ts-ignore */}
            <Inputbox_cantidad cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_ubicacion cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_marca_Create_Product cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_neto cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_iva cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_bruto cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_descripcion cssClassContainer="col-md-12 form-group" />
          </div>
          <div className="d-flex align-items-center">
            <Button_Reset_form />
            <Button_Create_Product />
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
  listaProductosDB: cachedProductListFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Formulario_Ingreso => ({
  //thunk
  fetchListaProductos: () => dispatch(fetchProductsFromDBToCache()),
  resetParamsAndFilteredLists: () => resetStoreParamsAndFilteredList(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Create_Product);
