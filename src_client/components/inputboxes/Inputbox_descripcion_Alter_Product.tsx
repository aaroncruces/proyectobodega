import { connect } from "react-redux";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { descripcionActiveFromState } from "../../redux/StateValueExtractor";
import { disableInputboxesExcept } from "../../helpers/disableInputboxesExcept";
import ParameterName from "../../redux/productParameters/enum_ParameterName";
import Inputbox_descripcion from "./Inputbox_descripcion";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !descripcionActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () =>
    disableInputboxesExcept(ParameterName.DESCRIPCION, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_descripcion);
