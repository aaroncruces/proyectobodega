import { cachedProductListFromState } from "../redux/StateValueExtractor";

const filterCachedProductList = (state) => {
  const cachedProductList = cachedProductListFromState(state);
};
