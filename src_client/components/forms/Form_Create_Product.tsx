// react+redux vendor
import React, { Component, useState } from "react";
import { connect } from "react-redux";
// Subcomponents
import Inputbox_sku_Create_Product from "../inputboxes/Inputbox_sku_Create_Product";
import Inputbox_codigo_barras_Create_Product from "../inputboxes/Inputbox_codigo_barras_Create_Product";
import Inputbox_modelo_Create_Product from "../inputboxes/Inputbox_modelo_Create_Product";
import Inputbox_cantidad from "../inputboxes/Inputbox_cantidad";
import Inputbox_ubicacion from "../inputboxes/Inputbox_ubicacion";
import Inputbox_marca_Create_Product from "../inputboxes/Inputbox_marca_Create_Product";
import Inputbox_precio_venta_neto from "../inputboxes/Inputbox_precio_venta_neto";
import Inputbox_precio_venta_bruto from "../inputboxes/Inputbox_precio_venta_bruto";
import Inputbox_iva from "../inputboxes/Inputbox_iva";
import Inputbox_descripcion from "../inputboxes/Inputbox_descripcion";
import Button_Create_Product from "../buttons/Button_Create_Product";
import Throbber from "../other_components/Throbber";
// helpers & utilities
import Props_Form_Create_Product from "../prop_types/type_Props_Form_Create_Product";
// redux custom
import { fetchProductsFromDBToCache } from "../../redux/cachedProductList/cachedProductListActionCreators";
import { cachedProductListFromState } from "../../redux/StateValueExtractor";
import { resetStoreParamsAndFilteredList } from "../../helpers/resetStoreParamsAndFilteredList";
import Button_Reset_form from "../buttons/Button_Reset_form";
import Alert_Connection_Status from "../other_components/Alert_Connection_Status";

class Form_Create_Product extends Component<Props_Form_Create_Product> {
  constructor(props) {
    super(props);
    this.props.fetchProductList();
  }
  //todo on discharge, clear params (sku, CB, Mrca, etc)
  render() {
    const propsButtonIngreso = {
      className: "me-3 mt-3 btn btn-primary",
    };
    this.props.resetParamsAndFilteredLists();
    return (
      <>
        <Alert_Connection_Status />
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
            {this.props.productListDB === undefined && (
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

const mapStateToProps = (state: any): Props_Form_Create_Product => ({
  productListDB: cachedProductListFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Create_Product => ({
  fetchProductList: () => dispatch(fetchProductsFromDBToCache()),
  resetParamsAndFilteredLists: () => resetStoreParamsAndFilteredList(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Create_Product);
