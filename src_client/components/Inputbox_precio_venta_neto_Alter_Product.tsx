import { connect } from "react-redux";
import Props_inputbox from "./prop_types/type_props_Inputbox";
import { precioVentaNetoActiveFromState } from "../redux/StateValueExtractor";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../helpers/disableInputboxesExcept";
import Inputbox_precio_venta_neto from "./Inputbox_precio_venta_neto";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !precioVentaNetoActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () =>
    disableInputboxesExcept(ParameterName.PRECIO_VENTA_NETO, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_precio_venta_neto);
