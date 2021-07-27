import Action from "../type_action";
import SkuActionsTypes from "./skuActionTypes";
import StateSku from "./type_state_sku";
const initialState: StateSku = {
  sku: "",
};
const skuReducer = (state: StateSku = initialState, action: Action): StateSku =>
  action.type == SkuActionsTypes.SET_SKU
    ? { ...state, sku: action.payload }
    : { ...state };
export default skuReducer;
