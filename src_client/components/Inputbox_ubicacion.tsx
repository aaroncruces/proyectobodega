import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import { setUbicacion } from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import { ubicacionFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: ubicacionFromState(state),
  name: "ubicacion",
  labelBody: "Ubicacion",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (ubicacion) => dispatch(setUbicacion(ubicacion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
