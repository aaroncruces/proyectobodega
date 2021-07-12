import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import StateCodigo_barras from "../redux/codigo_barras/type_state_codigo_barras";
import { setCodigo_barras } from "../redux/codigo_barras/codigo_barrasActionCreators";

class Inputbox_codigo_barras extends Inputbox<Props_inputbox> {
  name = "codigo_barras";
  labelBody = "Codigo de barras";
  format_onBlur = onBlur;
  format_onInput = onInput;
}

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.codigo_barrasReducer as StateCodigo_barras)
    .codigo_barras,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (codigo_barras) =>
    dispatch(setCodigo_barras(codigo_barras)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_codigo_barras);
