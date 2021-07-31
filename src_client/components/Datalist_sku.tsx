import { connect } from "react-redux";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  activeParameterFromState,
  cachedProductListFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import ActiveParameterName from "../redux/productParameters/activeParameterList/enum_ActiveParameterName";
import { setActiveParameter } from "../redux/productParameters/activeParameterList/activeParameterActionCreators";

const mapStateToProps = (state): Props_Datalist => ({
  textDatalist: skuFromState(state),
  parameterName: ActiveParameterName.SKU,
  name: "sku",
  labelBody: activeParameterFromState(state),
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? skuInvalid_ListNotFetched
      : skuInvalidOrRepeated_ListFetched(state),
  listOfData: cachedProductListFromState(state).map(
    (producto: Product) => producto.sku
  ),
  // cachedProductListFromState(state) == undefined
  //   ? listOfDataEmpty
  //   : listOfData_ListFetched(state),
  disabled:
    activeParameterFromState(state) !== ActiveParameterName.SKU &&
    activeParameterFromState(state) !== ActiveParameterName.NONE,
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
  updateStoreActiveParameterReducer: (activeParameter: ActiveParameterName) =>
    dispatch(setActiveParameter(activeParameter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
