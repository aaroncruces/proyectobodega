/**
 * identificadores para que el reducer (modeloReducer)
 * sepa que la accion es la de actualizar el modelo o la de borrar el texto
 */
enum ModeloActionsTypes {
  SET_MODELO = "SET_MODELO",
  RESET_MODELO = "RESET_MODELO",
}
export default ModeloActionsTypes;
