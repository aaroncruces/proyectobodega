// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Throbber from "../other_components/Throbber";
// redux custom
import { fetchProductsFromDBToCache } from "../../redux/cachedProductList/cachedProductListActionCreators";
import { cachedProductListFromState } from "../../redux/StateValueExtractor";
import Props_Form_Search_Modify_Product from "../prop_types/type_Props_Form_Search_Modify_Product";
import Datalist_sku from "../datalists/Datalist_sku";
import Datalist_modelo from "../datalists/Datalist_modelo";
import Datalist_marca from "../datalists/Datalist_marca";
import Datalist_codigo_barras from "../datalists/Datalist_codigo_barras";
import Datalist_ubicacion from "../datalists/Datalist_ubicacion";
import Datalist_descripcion from "../datalists/Datalist_descripcion";
import Inputbox_cantidad from "../inputboxes/Inputbox_cantidad";
import Inputbox_precio_venta_neto from "../inputboxes/Inputbox_precio_venta_neto";
import Inputbox_precio_venta_bruto from "../inputboxes/Inputbox_precio_venta_bruto";
import Inputbox_iva from "../inputboxes/Inputbox_iva";
import Button_Reset_form from "../buttons/Button_Reset_form";
import { resetStoreParamsAndFilteredList } from "../../helpers/resetStoreParamsAndFilteredList";
import Button_Go_To_Alter_Parameters from "../buttons/Button_Go_To_Alter_Parameters";
import Alert_Connection_Status from "../other_components/Alert_Connection_Status";

class Form_Search_Modify_Product extends Component<Props_Form_Search_Modify_Product> {
  constructor(props) {
    super(props);
    this.props.reFetchProductListToCache();
  }

  render() {
    this.props.resetParamsAndFilteredLists();

    return (
      <>
        <Alert_Connection_Status />
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
            {/*//@ts-ignore*/}
            <Datalist_ubicacion cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Datalist_marca cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore*/}
            <Inputbox_precio_venta_neto
              {...{ cssClassContainer: "col-md-4 form-group", disabled: true }}
            />
            {/*//@ts-ignore*/}
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

const mapStateToProps = (state: any): Props_Form_Search_Modify_Product => ({
  cachedProductList: cachedProductListFromState(state),
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Search_Modify_Product => ({
  //thunk
  reFetchProductListToCache: () => dispatch(fetchProductsFromDBToCache()),
  resetParamsAndFilteredLists: () => resetStoreParamsAndFilteredList(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Search_Modify_Product);
