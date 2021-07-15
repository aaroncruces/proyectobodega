import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import {
  valueToMoney,
  valueToNumber,
} from "../helpers/formato_cantidades_enteras";
import StatePrecio_venta_neto from "../redux/precio_venta_neto/type_state_precio_venta_neto";
import { setPrecio_venta_neto } from "../redux/precio_venta_neto/precio_venta_netoActionCreators";

/**
 * Transforma el precio de venta neto del tipo 1234567 a "$ 1.234.567"
 * @param state <1234567> el estado contiene la precio_venta_neto como number
 * @returns <"1.234.567"> la precio_venta_neto como string en los props
 */
const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: valueToMoney(
    (state.precio_venta_netoReducer as StatePrecio_venta_neto).precio_venta_neto
  ),
  name: "precio_venta_neto",
  labelBody: "Precio de venta neto",
  format_onBlur: valueToNumber,
  format_onInput: valueToNumber,
});

/**
 * El precio de venta neto es representado internamente como un numero,
 * se espera que antes de ingresar el numero a la store, se combierta a numero
 * esto es logrado con format_onInput = valueToNumber;
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (precio_venta_neto: number) =>
    dispatch(setPrecio_venta_neto(precio_venta_neto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
