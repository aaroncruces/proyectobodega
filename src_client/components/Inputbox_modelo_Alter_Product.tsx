import { connect } from "react-redux";
import Inputbox_modelo from "./Inputbox_modelo";
import Props_inputbox from "../helpers/type_props_Inputbox";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../helpers/disableInputboxesExcept";
import { modeloActiveFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !modeloActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () => {
    disableInputboxesExcept(ParameterName.MODELO, dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_modelo);
