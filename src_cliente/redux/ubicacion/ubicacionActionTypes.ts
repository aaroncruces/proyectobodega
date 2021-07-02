/**
 * identificadores para que el reducer (ubicacionReducer)
 * sepa que la accion es la de actualizar el ubicacion o la de borrar el texto
 */
enum UbicacionActionsTypes {
  SET_UBICACION = "SET_UBICACION",
  RESET_UBICACION = "RESET_UBICACION",
}
export default UbicacionActionsTypes;
