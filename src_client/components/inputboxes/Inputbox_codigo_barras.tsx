import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { onInput, onBlur } from "../../helpers/formato_codigos";
import { setCodigo_barras } from "../../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import { codigo_barrasFromState } from "../../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: codigo_barrasFromState(state),
  name: "codigo_barras",
  labelBody: "Codigo de barras",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (codigo_barras) =>
    dispatch(setCodigo_barras(codigo_barras)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
