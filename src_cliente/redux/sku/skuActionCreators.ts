/**
 * Entrega las acciones de actualizar el sku entregando el nuevo texto,
 * y la de eliminar el sku si hace falta.
 * Solo entrega objetos de tipo Action (autodefinidos), no actua, para eso es el reducer
 */
import SkuActionTypes from "./skuActionTypes";
import Action from "../type_action";
import { SKU_INVALID_MENSSAGE } from "./suInvalidMessages";
/**
 * Action para setear el cuerpo de sku
 * @param payload string asignable a state.sku
 * @returns
 */
const setSku = (payload: string): Action => ({
  type: SkuActionTypes.SET_SKU,
  payload,
});

/**
 * Action para setear si el sku ingresado es invalido
 * esto sirve para ser mostrado en los componentes React
 * @param payload boolean asignable a state.invalidSku
 * @returns
 */
const setSkuInvalid = (payload: boolean): Action => ({
  type: SkuActionTypes.SET_SKU_INVALID,
  payload,
});

/**
 * Action para setear el cuerpo del mensaje cuando sea invalido
 * esto sirve para ser mostrado en los componentes React
 * @param payload string asignable a state.invalidSkuMessage
 * @returns
 */
const setSkuInvalidMessage = (payload: string): Action => ({
  type: SkuActionTypes.SET_SKU_INVALID_MESSAGE,
  payload,
});

/**
 * Action para borrar todos los parametros de sku
 * @returns
 */
const resetSku = (): Action => ({ type: SkuActionTypes.RESET_SKU });

export { setSku, resetSku };
