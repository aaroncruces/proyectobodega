import replace from "voca/replace";
import capitalize from "voca/capitalize";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";

/**
 * Retorna cómo se debe formatear una descripcion, como: nombre, modelo, descripcion
 * debe ser en mayusculas, cualquier caracter
 * @param text texto ingresado en tiempo real en un inputbox
 * @returns texto
 */
const onInput = (text: string): string => capitalize(lowerCase(text));
/**
 * Retorna cómo se debe formatear una descripcion, como: Nombre, Modelo, Descripcion.
 * Elimina los espacios iniciales y finales.
 * Reduce los espacios multiples intersticiales.
 * Cambia los acentos graves a agudos
 * Elimina caracteres especiales que no sean numeros, letras, y acentos del español
 * @param text texto ingresado en un inputbox, despues des seleccionado
 * @returns texto
 */
/** */
const onBlur = (text: string): string => {
  //Elimina los espacios iniciales y finales
  let corrected = trim(text);
  //Reduce los espacios multiples intersticiales
  corrected = replace(corrected, /\s\s+/g, " ");
  // Cambia los acentos graves a agudos
  corrected = replace(trim(corrected), "à", "á");
  corrected = replace(trim(corrected), "è", "é");
  corrected = replace(trim(corrected), "ì", "í");
  corrected = replace(trim(corrected), "ò", "ó");
  corrected = replace(trim(corrected), "ù", "ú");
  corrected = replace(trim(corrected), "À", "Á");
  corrected = replace(trim(corrected), "È", "É");
  corrected = replace(trim(corrected), "Ì", "Í");
  corrected = replace(trim(corrected), "Ò", "Ó");
  corrected = replace(trim(corrected), "Ù", "Ú");

  // Elimina caracteres especiales que no sean numeros, letras, guiones, y acentos del español
  corrected = replace(corrected, /[^(\w|á|é|í|ó|ú|ñ|Á|É|Í|Ó|Ú|Ñ|\-)\s]/gi, "");
  //para eliminar algun caracter:
  //corrected = replace(trim(corrected), "<caracter>", "");
  return corrected;
};
export { onInput, onBlur };
