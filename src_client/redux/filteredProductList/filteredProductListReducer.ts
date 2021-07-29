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
    : { ...state };
};
export default filteredProductListReducer;
