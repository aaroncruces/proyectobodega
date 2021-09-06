import { connect } from "react-redux";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { codigo_barrasActiveFromState } from "../../redux/StateValueExtractor";
import ParameterName from "../../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../../helpers/disableInputboxesExcept";
import Inputbox_codigo_barras from "./Inputbox_codigo_barras";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !codigo_barrasActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () =>
    disableInputboxesExcept(ParameterName.CODIGO_BARRAS, dispatch),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_codigo_barras);
