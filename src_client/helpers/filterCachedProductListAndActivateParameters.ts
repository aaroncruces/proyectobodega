import { cachedProductListFromState } from "../redux/StateValueExtractor";

const filterCachedProductListAndActivateParameters = (
  state,
  parameterName: ParameterName
) => {
  const cachedProductList = cachedProductListFromState(state);
};
