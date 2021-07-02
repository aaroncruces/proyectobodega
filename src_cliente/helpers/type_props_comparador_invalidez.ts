/**
 * Quedan las variables marcadas como opcionales,
 * ya que son seteadas por distintas funciones, pero en realidad, son obligatorias
 */
type Comparador_invalidez = {
  /**
   * Los formularios deben poder acceder a la lista de productos, no solo por la DB,
   * si no, que principalmente, mediante la store (cache)
   */
  comparador: string;
  /**
   * Cada formulario puede, de una u otra manera, actualizar la DB
   */
  mensajeInvalido: string;
};
export default Comparador_invalidez;
