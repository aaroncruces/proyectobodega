import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import {
  valueToMoney,
  valueToNumber,
} from "../helpers/formato_cantidades_enteras";
import { setPrecio_venta_neto } from "../redux/precio_venta_neto/precio_venta_netoActionCreators";
import { IVA } from "../helpers/impuestos";
import { precioVentaNetoFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: valueToMoney(
    (precioVentaNetoFromState(state) / (1 + IVA)) * IVA
  ),
  name: "precio_venta_iva",
  labelBody: "IVA",
  format_onBlur: valueToNumber,
  format_onInput: valueToNumber,
  disabled: true,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (precio_venta_neto: number) =>
    dispatch(setPrecio_venta_neto((precio_venta_neto * (1 + IVA)) / IVA)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
