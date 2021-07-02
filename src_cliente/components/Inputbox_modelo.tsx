import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import StateModelo from "../redux/modelo/type_state_modelo";
import { setModelo } from "../redux/modelo/modeloActionCreators";

class Inputbox_modelo extends Inputbox<Props_inputbox> {
  name = "modelo";
  labelBody = "Nombre o Modelo";
  format_onBlur = onBlur;
  format_onInput = onInput;
}

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.modeloReducer as StateModelo).modelo,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValue: (modelo) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_modelo);
