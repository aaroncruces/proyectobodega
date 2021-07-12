type Props_Inputbox = {
  textInputBox?: string;
  updateStoreValueReducer?: (string) => any;
  cssClassContainer?: string;
  /**
   * Opcional
   * (string)=>"" by default
   */
  invalidComparator?: (text: string) => string;
  otherValueObserved?: string;
};
export default Props_Inputbox;
