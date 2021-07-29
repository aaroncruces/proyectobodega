import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import { setDescripcion } from "../redux/productParameters/descripcion/descripcionActionCreators";
import { descripcionFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: descripcionFromState(state),
  name: "descripcion",
  labelBody: "Descripcion",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (descripcion) =>
    dispatch(setDescripcion(descripcion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
