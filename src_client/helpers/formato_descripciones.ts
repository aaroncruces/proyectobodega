import replace from "voca/replace";
import capitalize from "voca/capitalize";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";

const onInput = (text: string): string => capitalize(lowerCase(text));

const onBlur = (text: string): string => {
  let corrected = trim(text);
  corrected = replace(corrected, /\s\s+/g, " ");
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
  corrected = replace(corrected, /[^(\w|á|é|í|ó|ú|ñ|Á|É|Í|Ó|Ú|Ñ|\-)\s]/gi, "");
  return corrected;
};
export { onInput, onBlur };
