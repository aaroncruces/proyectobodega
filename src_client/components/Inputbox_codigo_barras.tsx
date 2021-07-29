import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setCodigo_barras } from "../redux/codigo_barras/codigo_barrasActionCreators";
import {
  codigo_barrasFromState,
  cachedProductListFromState,
} from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: codigo_barrasFromState(state),
  name: "codigo_barras",
  labelBody: "Codigo de barras",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? () => ""
      : codigoBarrasRepeated_ListFetched(state),
});

const CODIGO_BARRAS_REPEATED_MESSAGE = "Ya existe un producto con este codigo";
const codigoBarrasRepeated_ListFetched = (state) => (text: string) =>
  cachedProductListFromState(state).find(
    (producto) => text != "" && producto.codigo_barras == text
  )
    ? CODIGO_BARRAS_REPEATED_MESSAGE
    : "";

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (codigo_barras) =>
    dispatch(setCodigo_barras(codigo_barras)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
