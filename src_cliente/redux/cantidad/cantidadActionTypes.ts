/**
 * identificadores para que el reducer (cantidadReducer)
 * sepa que la accion es la de actualizar el cantidad o la de borrar el texto
 */
enum CantidadActionsTypes {
  SET_CANTIDAD = "SET_CANTIDAD",
  RESET_CANTIDAD = "RESET_CANTIDAD",
}
export default CantidadActionsTypes;
