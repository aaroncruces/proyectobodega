// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponents
import Inputbox_sku_Alter_Product from "../inputboxes/Inputbox_sku_Alter_Product";
import Inputbox_codigo_barras_Alter_Product from "../inputboxes/Inputbox_codigo_barras_Alter_Product";
import Inputbox_modelo_Alter_Product from "../inputboxes/Inputbox_modelo_Alter_Product";
import Inputbox_cantidad_Alter_Product from "../inputboxes/Inputbox_cantidad_Alter_Product";
import Inputbox_ubicacion_Alter_Product from "../inputboxes/Inputbox_ubicacion_Alter_Product";
import Inputbox_marca_Alter_Product from "../inputboxes/Inputbox_marca_Alter_Product";
import Inputbox_precio_venta_neto_Alter_Product from "../inputboxes/Inputbox_precio_venta_neto_Alter_Product";
import Inputbox_precio_venta_bruto_Alter_Product from "../inputboxes/Inputbox_precio_venta_bruto_Alter_Product";
import Inputbox_iva from "../inputboxes/Inputbox_iva";
import Inputbox_descripcion_Alter_Product from "../inputboxes/Inputbox_descripcion_Alter_Product";
import Props_Form_Alter_Product from "../prop_types/type_Props_Form_Alter_Product";
import { activateParams } from "../../helpers/activateParams";
import Button_Go_To_Search_Product_Parameters from "../buttons/Button_Go_To_Search_Product_Parameters";
import Button_Accept_Modifications_Product from "../buttons/Button_Accept_Modifications_Product";

class Form_Alter_Product_Parameters extends Component<Props_Form_Alter_Product> {
  constructor(props) {
    super(props);
  }
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
            <Button_Go_To_Search_Product_Parameters />
            <Button_Accept_Modifications_Product />
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
