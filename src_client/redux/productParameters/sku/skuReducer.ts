import Action from "../../type_action";
import SkuActionsTypes from "./skuActionTypes";
import StateSku from "./type_state_sku";
const initialState: StateSku = {
  sku: "",
  sku_parameterActive: true,
};
const skuReducer = (state: StateSku = initialState, action: Action): StateSku =>
  action.type == SkuActionsTypes.SET_SKU
    ? { ...state, sku: action.payload }
    : action.type == SkuActionsTypes.ACTIVATE_PARAMETER
    ? { ...state, sku_parameterActive: true }
    : action.type == SkuActionsTypes.DEACTIVATE_PARAMETER
    ? { ...state, sku_parameterActive: false }
    : { ...state };
export default skuReducer;
