/**
 * Enfuerza la estructura del prop de Inputbox
 * para que sea visible por todas sus sub-instancias.
 * Quedan las variables marcadas como opcionales,
 * ya que son seteadas por distintas funciones, pero en realidad, son obligatorias
 */
type Props_Inputbox = {
  /**
   * OBLIGATORIO.
   * El texto que le paso al componente Inputbox
   * a demas de ser el valor del state
   * pasado mediante mapStateToProps
   */
  textInputBox?: string;
  /**
   * OBLIGATORIO.
   * La accion de actualizar el valor al store,
   * pasada mediante mapDispatchToProps
   */
  updateStoreValue?: (string) => any;
  /**
   * OBLIGATORIO.
   * Clase para estilizar el componente, pasada mediante props
   */
  classContainer?: string;
};
export default Props_Inputbox;
