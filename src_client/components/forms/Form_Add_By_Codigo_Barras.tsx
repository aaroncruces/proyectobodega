// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponents
import Inputbox_amount_per_scan from "../inputboxes/Inputbox_amount_per_scan";
import Inputbox_cantidad from "../inputboxes/Inputbox_cantidad";
import Inputbox_codigo_barras_Add_By_Codigo_Barras from "../inputboxes/Inputbox_codigo_barras_Add_By_Codigo_Barras";
import Alert_Connection_Status from "../other_components/Alert_Connection_Status";
import { fetchProductsFromDBToCache } from "../../redux/cachedProductList/cachedProductListActionCreators";
import Props_Form_Add_By_Codigo_Barras from "../prop_types/type_Props_Form_Add_By_Codigo_Barras";

class Form_Add_By_Codigo_Barras extends Component<Props_Form_Add_By_Codigo_Barras> {
  constructor(props) {
    super(props);
    this.props.fetchProductList();
  }
  //<Inputbox_cantidad cssClassContainer="col-md-12 form-group" />
  render() {
    return (
      <>
        <Alert_Connection_Status />
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_codigo_barras_Add_By_Codigo_Barras cssClassContainer="col-md-12 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_amount_per_scan cssClassContainer="col-md-12 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_cantidad
              {...{
                cssClassContainer: "col-md-12 form-group",
                disabled: true,
                labelBody: "Cantidad de productos actuales",
              }}
            />
          </div>
          <div className="d-flex align-items-center">
            {
              //buttons
            }
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Form_Add_By_Codigo_Barras => ({});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Add_By_Codigo_Barras => ({
  fetchProductList: () => dispatch(fetchProductsFromDBToCache()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Add_By_Codigo_Barras);
