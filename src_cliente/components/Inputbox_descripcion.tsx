import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import StateDescripcion from "../redux/descripcion/type_state_descripcion";
import { setDescripcion } from "../redux/descripcion/descripcionActionCreators";

class Inputbox_descripcion extends Inputbox<Props_inputbox> {
  name = "descripcion";
  labelBody = "Descripcion";
  format_onBlur = onBlur;
  format_onInput = onInput;
}

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.descripcionReducer as StateDescripcion).descripcion,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (descripcion) =>
    dispatch(setDescripcion(descripcion)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_descripcion);
