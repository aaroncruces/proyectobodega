import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import FilteredProductListActionTypes from "./filteredProductListActionTypes";
import StateCachedProductList from "../cachedProductList/type_StateCachedProductList";

const setFilteredProductList = (payload: Product[]): Action => ({
  type: FilteredProductListActionTypes.SET_FILTERED_PRODUCT_LIST,
  payload,
});

const reloadFilteredProductListFromCache = () => (dispatch, getState) =>
  dispatch(
    setFilteredProductList(
      (getState().cachedProductListReducer as StateCachedProductList)
        .cachedProductList
    )
  );
export { setFilteredProductList, reloadFilteredProductListFromCache };
