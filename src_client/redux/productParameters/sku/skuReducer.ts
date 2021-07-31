import Action from "../../type_action";
import SkuActionTypes from "./skuActionTypes";
import StateSku from "./type_state_sku";
const initialState: StateSku = {
  sku: "",
  sku_parameterActive: true,
};
const skuReducer = (state: StateSku = initialState, action: Action): StateSku =>
  action.type == SkuActionTypes.SET_SKU
    ? { ...state, sku: action.payload }
    : action.type == SkuActionTypes.ACTIVATE_SKU
    ? { ...state, sku_parameterActive: true }
    : action.type == SkuActionTypes.DEACTIVATE_SKU
    ? { ...state, sku_parameterActive: false }
    : { ...state };
export default skuReducer;
