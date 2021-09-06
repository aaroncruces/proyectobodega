import { connect } from "react-redux";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { ubicacionActiveFromState } from "../../redux/StateValueExtractor";
import Inputbox_ubicacion from "./Inputbox_ubicacion";
import { disableInputboxesExcept } from "../../helpers/disableInputboxesExcept";
import ParameterName from "../../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: !ubicacionActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnclick: () => disableInputboxesExcept(ParameterName.UBICACION, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_ubicacion);
