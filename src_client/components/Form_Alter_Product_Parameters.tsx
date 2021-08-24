// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponents
import Inputbox_sku_Alter_Product from "./Inputbox_sku_Alter_Product";
import Inputbox_codigo_barras_Alter_Product from "./Inputbox_codigo_barras_Alter_Product";
import Inputbox_modelo_Alter_Product from "./Inputbox_modelo_Alter_Product";
import Inputbox_cantidad_Alter_Product from "./Inputbox_cantidad_Alter_Product";
import Inputbox_ubicacion_Alter_Product from "./Inputbox_ubicacion_Alter_Product";
import Inputbox_marca_Alter_Product from "./Inputbox_marca_Alter_Product";
import Inputbox_precio_venta_neto_Alter_Product from "./Inputbox_precio_venta_neto_Alter_Product";
import Inputbox_precio_venta_bruto_Alter_Product from "./Inputbox_precio_venta_bruto_Alter_Product";
import Inputbox_iva from "./Inputbox_iva";
import Inputbox_descripcion_Alter_Product from "./Inputbox_descripcion_Alter_Product";
import Props_Form_Alter_Product from "../helpers/type_Props_Form_Alter_Product";
import { activateParams } from "../helpers/activateParams";

class Form_Alter_Product_Parameters extends Component<Props_Form_Alter_Product> {
  constructor(props) {
    super(props);
  }
  //todo on discharge, clear params (sku, CB, Mrca, etc)
  render() {
    this.props.unlockParams();
    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_sku_Alter_Product cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_codigo_barras_Alter_Product cssClassContainer="col-md-3 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_modelo_Alter_Product cssClassContainer="col-md-5 form-group" />
          </div>
          <div className="row mb-4">
            {/*//@ts-ignore */}
            <Inputbox_cantidad_Alter_Product cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_ubicacion_Alter_Product cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_marca_Alter_Product cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_neto_Alter_Product cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_iva cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_bruto_Alter_Product cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_descripcion_Alter_Product cssClassContainer="col-md-12 form-group" />
          </div>
          <div className="d-flex align-items-center">
            {
              //button
            }
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Form_Alter_Product => ({});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Form_Alter_Product => ({
  unlockParams: () => activateParams(dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form_Alter_Product_Parameters);
