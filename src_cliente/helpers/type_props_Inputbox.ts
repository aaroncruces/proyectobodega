import Producto from "../../src_servidor/tipos/Producto";

/**
 * - Enfuerza la estructura del prop de Inputbox
 * para que sea visible por todas sus sub-instancias.
 * - Quedan las variables marcadas como opcionales,
 * ya que son seteadas por distintas funciones, pero en realidad, son obligatorias
 */
type Props_Inputbox = {
  /**
   * OBLIGATORIO.
   * - El texto que le paso al componente Inputbox
   * a demas de ser el valor del state
   * pasado mediante mapStateToProps
   */
  textInputBox?: string;
  /**
   * OBLIGATORIO.
   * - La accion de actualizar el valor al store,
   * pasada mediante mapDispatchToProps
   */
  updateStoreValue?: (string) => any;
  /**
   * OBLIGATORIO.
   * - Clase para estilizar el componente, pasada mediante props
   */
  classContainer?: string;
  /**
   * Opcional
   * - En caso de no necesitar un comparador,
   * dejar como default (string)=>"" si invalidComparator no está definido
   * - notese que si seteo condicionalmente (por ejemplo, Lista de productos fetcheadas o no aun):
   * condicionAsincronaBasadaEnProps? invalidComparator1 :invalidComparator2.
   * entonces, aunque se cumpla la condicion, se debe rerenderizar el componente para chequear la condicion nueva
   *
   */
  invalidComparator?: (text: string | number) => string;
};
export default Props_Inputbox;
