/**
 * identificadores para que el reducer (codigo_barrasReducer)
 * sepa que la accion es la de actualizar el codigo_barras o la de borrar el texto
 */
enum Codigo_barrasActionsTypes {
  SET_CODIGO_BARRAS = "SET_CODIGO_BARRAS",
  RESET_CODIGO_BARRAS = "RESET_CODIGO_BARRAS",
}
export default Codigo_barrasActionsTypes;
