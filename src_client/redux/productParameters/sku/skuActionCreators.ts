import SkuActionTypes from "./skuActionTypes";
import Action from "../../type_action";
const setSku = (payload: string): Action => ({
  type: SkuActionTypes.SET_SKU,
  payload,
});
const activateSku = (): Action => ({
  type: SkuActionTypes.ACTIVATE_SKU,
});
const deactivateSku = (): Action => ({
  type: SkuActionTypes.DEACTIVATE_SKU,
});
export { setSku, activateSku, deactivateSku };
