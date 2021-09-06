import { connect } from "react-redux";
import Props_inputbox from "./prop_types/type_props_Inputbox";
import { precioVentaBrutoActiveFromState } from "../redux/StateValueExtractor";
import Inputbox_precio_venta_bruto from "./Inputbox_precio_venta_bruto";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../helpers/disableInputboxesExcept";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !precioVentaBrutoActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () =>
    disableInputboxesExcept(ParameterName.PRECIO_VENTA_BRUTO, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_precio_venta_bruto);
