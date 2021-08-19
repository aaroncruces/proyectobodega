import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import { setMarca } from "../redux/productParameters/marca/marcaActionCreators";
import { marcaFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: marcaFromState(state),
  name: "marca",
  labelBody: "Marca",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (marca) => dispatch(setMarca(marca)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
