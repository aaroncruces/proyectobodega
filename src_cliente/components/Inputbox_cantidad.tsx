import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import {
  valueToString,
  valueToNumber,
} from "../helpers/formato_cantidades_enteras";
import StateCantidad from "../redux/cantidad/type_state_cantidad";
import { setCantidad } from "../redux/cantidad/cantidadActionCreators";

class Inputbox_cantidad extends Inputbox<Props_inputbox> {
  name = "cantidad";
  labelBody = "Cantidad";
  format_onBlur = valueToNumber;
  format_onInput = valueToNumber;
}
/**
 * transforma una cantidad del tipo 1234567 a "1.234.567"
 * @param state <1234567> el estado contiene la cantidad como number
 * @returns <"1.234.567"> la cantidad como string en los props
 */
const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: valueToString(
    (state.cantidadReducer as StateCantidad).cantidad
  ),
});

/**
 * La cantidad es representada internamente como un numero,
 * se espera que antes de ingresar el numero a la store, se combierta a numero
 * esto es logrado con format_onInput = valueToNumber;
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (cantidad: number) =>
    dispatch(setCantidad(cantidad)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_cantidad);
