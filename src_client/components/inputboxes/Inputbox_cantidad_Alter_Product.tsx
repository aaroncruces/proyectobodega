import { connect } from "react-redux";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { cantidadActiveFromState } from "../../redux/StateValueExtractor";
import Inputbox_cantidad from "./Inputbox_cantidad";
import ParameterName from "../../redux/productParameters/enum_ParameterName";
import { disableInputboxesExcept } from "../../helpers/disableInputboxesExcept";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !cantidadActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () => {
    disableInputboxesExcept(ParameterName.CANTIDAD, dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_cantidad);
