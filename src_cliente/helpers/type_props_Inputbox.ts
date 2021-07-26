type Props_Inputbox = {
  textInputBox?: string;
  updateStoreValueReducer?: (string) => any;
  cssClassContainer?: string;
  invalidComparator?: (text: string) => string;
  name?: string;
  labelBody?: string;
  format_onBlur?: (text: string) => string | number;
  format_onInput?: (text: string) => string | number;
  disabled?: boolean;
};
export default Props_Inputbox;
