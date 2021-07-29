import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import FilteredProductListActionTypes from "./filteredProductListActionTypes";

const setListaProductosBuscados = (payload: Product[]): Action => ({
  type: FilteredProductListActionTypes.SET_FILTERED_PRODUCT_LIST,
  payload,
});
export { setListaProductosBuscados };
