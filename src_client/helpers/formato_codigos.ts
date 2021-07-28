import upperCase from "voca/upper_case";
import trim from "voca/trim";

const onInput = (text: string): string => upperCase(text);
const onBlur = (text: string): string => trim(text);
export { onInput, onBlur };
