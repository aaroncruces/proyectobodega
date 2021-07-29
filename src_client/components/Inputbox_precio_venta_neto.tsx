import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import {
  valueToMoney,
  valueToNumber,
} from "../helpers/formato_cantidades_enteras";
import { setPrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import { precioVentaNetoFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: valueToMoney(precioVentaNetoFromState(state)),
  name: "precio_venta_neto",
  labelBody: "Precio de venta neto",
  format_onBlur: valueToNumber,
  format_onInput: valueToNumber,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (precio_venta_neto: number) =>
    dispatch(setPrecio_venta_neto(precio_venta_neto)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
