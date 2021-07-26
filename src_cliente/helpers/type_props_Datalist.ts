type Props_Datalist = {
  textDatalist?: string;
  updateStoreValueReducer?: (string) => any;
  cssClassContainer?: string;
  invalidComparator?: (text: string) => string;
  otherValueObserved?: string;
  name?: string;
  labelBody?: string;
  //necesito formatearlo?????? no creo
  format_onBlur?: (text: string) => string | number;
  format_onInput?: (text: string) => string | number;
};
export default Props_Datalist;
