import Action from "../type_action";
import SkuActionsTypes from "./skuActionTypes";
import { SKU_INVALID_MENSSAGE } from "./suInvalidMessages";
import StateSku from "./type_state_sku";
const initialState: StateSku = {
  sku: "",
  invalidSku: true,
  invalidSkuMessage: SKU_INVALID_MENSSAGE,
};
/**
 * Actualiza el Sku en la Store
 * Dado que SKU solo sabe de SKU, es la responsabilidad de otros setear invalid o invalidMessag
 * @param state contiene el valor de sku, nada mas
 * @param action puede ser setSku(nuevoSKU) o resetSku
 * @returns
 */
const skuReducer = (state: StateSku = initialState, action: Action): StateSku =>
  action.type == SkuActionsTypes.SET_SKU
    ? { ...state, sku: action.payload }
    : action.type == SkuActionsTypes.SET_SKU_INVALID
    ? { ...state, invalidSku: action.payload }
    : action.type == SkuActionsTypes.SET_SKU_INVALID_MESSAGE
    ? { ...state, invalidSkuMessage: action.payload }
    : action.type == SkuActionsTypes.RESET_SKU
    ? { ...state, sku: "", invalidSku: false, invalidSkuMessage: "" }
    : { ...state };
export default skuReducer;
