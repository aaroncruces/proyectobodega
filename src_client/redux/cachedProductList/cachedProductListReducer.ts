import Action from "../type_action";
import cachedProductListActionTypes from "./cachedProductListActionTypes";
import StateCachedProductList from "./type_StateCachedProductList";
const initialState: StateCachedProductList = {
  cachedProductList: undefined,
};

const cachedProductListReducer = (
  state: StateCachedProductList = initialState,
  action: Action
): StateCachedProductList => {
  return action.type == cachedProductListActionTypes.SET_PRODUCT_LIST_TO_CACHE
    ? { ...state, cachedProductList: action.payload }
    : action.type == cachedProductListActionTypes.PUSH_PRODUCT_TO_CACHE
    ? {
        ...state,
        cachedProductList: [...state.cachedProductList, action.payload],
      }
    : { ...state };
};
export default cachedProductListReducer;
