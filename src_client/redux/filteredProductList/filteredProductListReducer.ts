import Product from "../../../src_server/types/Product";
import Action from "../type_action";
import FilteredProductListActionTypes from "./filteredProductListActionTypes";
import StateFilteredProductList from "./type_StateFilteredProductList";
const initialState: StateFilteredProductList = {
  filteredProductList: undefined,
};

const filteredProductListReducer = (
  state: StateFilteredProductList = initialState,
  action: Action
): StateFilteredProductList => {
  return action.type == FilteredProductListActionTypes.SET_FILTERED_PRODUCT_LIST
    ? { ...state, filteredProductList: action.payload }
    : action.type == FilteredProductListActionTypes.FILTER_PRODUCT_LIST
    ? {
        ...state,
        filteredProductList: filterList(
          state.filteredProductList,
          action.payload
        ),
      }
    : { ...state };
};
const filterList = (
  productList: Product[],
  filtererProductTemplate: Product
): Product[] => {
  let filteredList =
    filtererProductTemplate.sku == ""
      ? productList
      : productList.filter((product) => {
          product.sku == filtererProductTemplate.sku;
        });

  return filteredList;
};
export default filteredProductListReducer;
