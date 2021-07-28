import { connect } from "react-redux";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  listaProductosFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";

const mapStateToProps = (state): Props_Datalist => ({
  textDatalist: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    listaProductosFromState(state) == undefined
      ? skuInvalid_ListNotFetched
      : skuInvalidOrRepeated_ListFetched(state),
  listOfData:
    listaProductosFromState(state) == undefined
      ? listOfDataEmpty
      : listOfData_ListFetched(state),
});
const listOfDataEmpty = [];
const listOfData_ListFetched = (state): string[] =>
  listaProductosFromState(state).map((producto: Product) => producto.sku);

const skuInvalid_ListNotFetched = (text: string) => {
  if (text == "") return "";
  return "Cargando lista. Espere por favor";
};
const skuInvalidOrRepeated_ListFetched = (state) => (text: string) => {
  if (text == "") return "";

  const productoEncontrado: Product = listaProductosFromState(state).find(
    (producto) => producto.sku == text
  );

  return productoEncontrado == undefined ? "" : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
