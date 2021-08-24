import { connect } from "react-redux";
import Inputbox_marca from "./Inputbox_marca";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { marcaActiveFromState } from "../redux/StateValueExtractor";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../helpers/disableInputboxesExcept";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !marcaActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () => disableInputboxesExcept(ParameterName.MARCA, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_marca);
