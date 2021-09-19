import { KeyboardEventHandler } from "react";

type Props_Inputbox = {
  textInputBox?: string | number;
  updateStoreValueReducer?: (string) => any;
  cssClassContainer?: string;
  invalidComparator?: (text: string) => string;
  name?: string;
  type?: string;
  labelBody?: string;
  format_onBlur?: (text) => string | number;
  format_onInput?: (text) => string | number;
  disabled?: boolean;
  execOnclick?: () => any;
  execOnKeyDown?: (event: React.KeyboardEvent<any>) => any;
  execOnInput?: (event: React.ChangeEvent<HTMLInputElement>) => any;
};
export default Props_Inputbox;
