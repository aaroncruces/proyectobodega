import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import StateModelo from "../redux/modelo/type_state_modelo";
import { setModelo } from "../redux/modelo/modeloActionCreators";
import StateMarca from "../redux/marca/type_state_marca";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.modeloReducer as StateModelo).modelo,
  otherValueObserved: (state.marcaReducer as StateMarca).marca,
  name: "modelo",
  labelBody: "Nombre o Modelo",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (modelo) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
