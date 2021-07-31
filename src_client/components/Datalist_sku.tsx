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
import { lowerCase } from "voca";

const mapStateToProps = (state): Props_Datalist => ({
  textDatalist: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator: (txt) => "",
  listOfData:
    cachedProductListFromState(state) == undefined
      ? []
      : cachedProductListFromState(state).map(
          (producto: Product) => producto.sku
        ),
  enabled: skuActiveFromState(state),
});

const filterCachedProductListAndActivateParameters = (state) => {
  // comienzo con sku -> modelo -> marca -> cantidad, despues agrego resto
  let filteredList = cachedProductListFromState(state);
  if (skuFromState(state) != "") {
    filteredList = filteredList.filter((product: Product) =>
      lowerCase(product.sku).includes(lowerCase(skuFromState(state)))
    );
  }
  if (filteredList.length == 0) {
    //todo: disable all the rest
  }
  return filteredList;
};

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
