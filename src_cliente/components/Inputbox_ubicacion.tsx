import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import StateUbicacion from "../redux/ubicacion/type_state_ubicacion";
import { setUbicacion } from "../redux/ubicacion/ubicacionActionCreators";

class Inputbox_ubicacion extends Inputbox<Props_inputbox> {
  name = "ubicacion";
  labelBody = "Ubicacion";
  format_onBlur = onBlur;
  format_onInput = onInput;
}

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.ubicacionReducer as StateUbicacion).ubicacion,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (ubicacion) => dispatch(setUbicacion(ubicacion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_ubicacion);
