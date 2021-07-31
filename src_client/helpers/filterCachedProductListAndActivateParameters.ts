import {
  cachedProductListFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Product from "../../src_server/types/Product";
import lowerCase from "voca/lower_case";
const filterCachedProductListAndActivateParameters = (state) => {
  // comienzo con sku -> modelo -> marca -> cantidad, despues agrego resto
  let filteredList = cachedProductListFromState(state);
  if (skuFromState(state) != "") {
    filteredList = filteredList.filter((product: Product) =>
      lowerCase(product.sku).includes(skuFromState(state))
    );
  }
  if (filteredList.length == 0) {
    //todo: disable all the rest
  }
  return filteredList;
};
export default filterCachedProductListAndActivateParameters;
