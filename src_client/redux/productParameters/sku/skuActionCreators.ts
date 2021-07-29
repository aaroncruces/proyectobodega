import SkuActionTypes from "./skuActionTypes";
import Action from "../../type_action";
const setSku = (payload: string): Action => ({
  type: SkuActionTypes.SET_SKU,
  payload,
});
export { setSku };
