/**
 * identificadores para que el reducer (descripcionReducer)
 * sepa que la accion es la de actualizar el descripcion o la de borrar el texto
 */
enum DescripcionActionsTypes {
  SET_DESCRIPCION = "SET_DESCRIPCION",
  RESET_DESCRIPCION = "RESET_DESCRIPCION",
}
export default DescripcionActionsTypes;
