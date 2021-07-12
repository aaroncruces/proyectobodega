import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import StateMarca from "../redux/marca/type_state_marca";
import { setMarca } from "../redux/marca/marcaActionCreators";
import StateModelo from "../redux/modelo/type_state_modelo";

class Inputbox_marca extends Inputbox<Props_inputbox> {
  name = "marca";
  labelBody = "Marca";
  format_onBlur = onBlur;
  format_onInput = onInput;
}

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.marcaReducer as StateMarca).marca,
  otherValueObserved: (state.modeloReducer as StateModelo).modelo,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (marca) => dispatch(setMarca(marca)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_marca);
