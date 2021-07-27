import { connect, ConnectedProps } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import {
  valueToString,
  valueToNumber,
} from "../helpers/formato_cantidades_enteras";
import { setCantidad } from "../redux/cantidad/cantidadActionCreators";
import { cantidadFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: valueToString(cantidadFromState(state)),
  name: "cantidad",
  labelBody: "Cantidad",
  format_onBlur: valueToNumber,
  format_onInput: valueToNumber,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (cantidad: number) =>
    dispatch(setCantidad(cantidad)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
