// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Throbber from "./Throbber";
// redux custom
import { fetchProductsFromDBToCache } from "../redux/cachedProductList/cachedProductListActionCreators";
import { cachedProductListFromState } from "../redux/StateValueExtractor";
import Props_Form_Modify_Product from "../helpers/type_Props_Form_Modify_Product";
import Datalist_sku from "./Datalist_sku";
import Datalist_modelo from "./Datalist_modelo";
import Datalist_marca from "./Datalist_marca";
import Datalist_codigo_barras from "./Datalist_codigo_barras";
import Datalist_ubicacion from "./Datalist_ubicacion";
import Inputbox_cantidad from "./Inputbox_cantidad";

class Form_Modify_Product extends Component<Props_Form_Modify_Product> {
  constructor(props) {
    super(props);
    this.props.reFetchProductListToCache();
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

          <div className="row mb-3"></div>
          {this.props.cachedProductList === undefined && (
            <div className="ms-auto">
              <Throbber />
            </div>
          )}
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Form_Modify_Product => ({
  cachedProductList: cachedProductListFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Modify_Product => ({
  //thunk
  reFetchProductListToCache: () => dispatch(fetchProductsFromDBToCache()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Modify_Product);
