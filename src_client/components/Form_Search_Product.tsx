// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Throbber from "./Throbber";
// redux custom
import { fetchProductsFromDBToCache } from "../redux/cachedProductList/cachedProductListActionCreators";
import { cachedProductListFromState } from "../redux/StateValueExtractor";
import Props_Form_Search_Product from "../helpers/type_Props_Form_Search_Product";
import Datalist_sku from "./Datalist_sku";
import Datalist_modelo from "./Datalist_modelo";
import Datalist_marca from "./Datalist_marca";
import Datalist_codigo_barras from "./Datalist_codigo_barras";
import Datalist_ubicacion from "./Datalist_ubicacion";
import Datalist_descripcion from "./Datalist_descripcion";
import Inputbox_cantidad from "./Inputbox_cantidad";
import Inputbox_precio_venta_neto from "./Inputbox_precio_venta_neto";
import Inputbox_precio_venta_bruto from "./Inputbox_precio_venta_bruto";
import Inputbox_iva from "./Inputbox_iva";
import Button_Reset_form from "./Button_Reset_form";
import { resetStoreParamsAndFilteredList } from "../helpers/resetStoreParamsAndFilteredList";
import Button_Go_To_Alter_Parameters from "./Button_Go_To_Alter_Parameters";

class Form_Search_Product extends Component<Props_Form_Search_Product> {
  constructor(props) {
    super(props);
    this.props.reFetchProductListToCache();
  }

  render() {
    this.props.resetParamsAndFilteredLists();

    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Datalist_sku cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Datalist_codigo_barras cssClassContainer="col-md-3 form-group" />
            {/*//@ts-ignore */}
            <Datalist_modelo cssClassContainer="col-md-5 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore*/}
            <Inputbox_cantidad
              {...{ cssClassContainer: "col-md-4 form-group", disabled: true }}
            />
            {/*//@ts-ignore UBUCACION*/}
            <Datalist_ubicacion cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Datalist_marca cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore*/}
            <Inputbox_precio_venta_neto
              {...{ cssClassContainer: "col-md-4 form-group", disabled: true }}
            />
            {/*//@ts-ignore UBUCACION*/}
            <Inputbox_iva
              {...{ cssClassContainer: "col-md-4 form-group", disabled: true }}
            />
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_bruto
              {...{ cssClassContainer: "col-md-4 form-group", disabled: true }}
            />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Datalist_descripcion cssClassContainer="col-md-12 form-group" />
          </div>

          <div className="d-flex align-items-center">
            <Button_Reset_form />
            <Button_Go_To_Alter_Parameters />

            {this.props.cachedProductList === undefined && (
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

const mapStateToProps = (state: any): Props_Form_Search_Product => ({
  cachedProductList: cachedProductListFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Search_Product => ({
  //thunk
  reFetchProductListToCache: () => dispatch(fetchProductsFromDBToCache()),
  resetParamsAndFilteredLists: () => resetStoreParamsAndFilteredList(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Search_Product);
