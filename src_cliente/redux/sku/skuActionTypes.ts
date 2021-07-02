/**
 * identificadores para que el reducer (skuReducer)
 * sepa que la accion es la de actualizar el sku o la de borrar el texto
 */
enum SkuActionsTypes {
  SET_SKU = "SET_SKU",
  SET_SKU_INVALID = "SET_SKU_INVALID",
  SET_SKU_INVALID_MESSAGE = "SET_SKU_INVALID_MESSAGE",
  RESET_SKU = "RESET_SKU",
}
export default SkuActionsTypes;
