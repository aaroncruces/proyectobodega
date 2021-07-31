import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  skuActiveFromState,
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
    cachedProductListFromState(state) == undefined
      ? skuInvalid_ListNotFetched
      : skuInvalidOrRepeated_ListFetched(state),
  listOfData:
    cachedProductListFromState(state) == undefined
      ? []
      : cachedProductListFromState(state).map(
          (producto: Product) => producto.sku
        ),

  // cachedProductListFromState(state) == undefined
  //   ? listOfDataEmpty
  //   : listOfData_ListFetched(state),
  enabled: skuActiveFromState(state),
});

const listOfDataEmpty = [];
const listOfData_ListFetched = (state): string[] =>
  cachedProductListFromState(state).map((producto: Product) => producto.sku);

const skuInvalid_ListNotFetched = (text: string) => {
  if (text == "") return "";
  return "Cargando lista. Espere por favor";
};
const skuInvalidOrRepeated_ListFetched = (state) => (text: string) => {
  if (text == "") return "";

  const productoEncontrado: Product = cachedProductListFromState(state).find(
    (producto) => producto.sku == text
  );

  return productoEncontrado == undefined ? "" : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
