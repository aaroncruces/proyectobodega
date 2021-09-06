import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { onInput, onBlur } from "../../helpers/formato_descripciones";
import { setModelo } from "../../redux/productParameters/modelo/modeloActionCreators";
import { modeloFromState } from "../../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: modeloFromState(state),
  name: "modelo",
  labelBody: "Nombre o Modelo",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (modelo) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
