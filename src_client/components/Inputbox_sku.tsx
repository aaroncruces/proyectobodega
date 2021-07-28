import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/sku/skuActionCreators";
import Producto from "../../src_server/types/Product";
import {
  listaProductosFromState,
  skuFromState,
} from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    listaProductosFromState(state) == undefined
      ? skuInvalid_ListNotFetched
      : skuInvalidOrRepeated_ListFetched(state),
});
const SKU_EMPTY_MESSAGE = "SKU es obligatorio";

const skuInvalid_ListNotFetched = (text: string) =>
  text == "" ? SKU_EMPTY_MESSAGE : "";

const skuInvalidOrRepeated_ListFetched = (state) => (text: string) => {
  if (text == "") return SKU_EMPTY_MESSAGE;

  const productoEncontrado: Producto = listaProductosFromState(state).find(
    (producto) => producto.sku == text
  );

  return productoEncontrado
    ? `El producto ya existe. ${productoEncontrado.modelo} ${productoEncontrado.marca}`
    : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
