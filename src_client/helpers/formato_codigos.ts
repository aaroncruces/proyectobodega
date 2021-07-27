import upperCase from "voca/upper_case";
import trim from "voca/trim";
/**
 * Retorna cómo se debe formatear un codigo, como SKU o Código de barras
 * debe ser en mayusculas, cualquier caracter
 * @param text texto ingresado en tiempo real en un inputbox
 * @returns texto en mayusculas
 */
const onInput = (text: string): string => upperCase(text);
/**
 * Retorna cómo se debe formatear un codigo, como SKU o Código de barras
 * no debe tener espacios en los extremos
 * @param text texto ingresado en un inputbox, despues des seleccionado
 * @returns texto sin espacios en los bordes
 */
const onBlur = (text: string): string => trim(text);
export { onInput, onBlur };
