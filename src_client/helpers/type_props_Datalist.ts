type Props_Datalist = {
  textDatalist?: string;
  listOfData?: string[] | number[];
  updateStoreValueReducer?: (string) => any;
  cssClassContainer?: string;
  invalidComparator?: (text: string) => string;
  name?: string;
  labelBody?: string;
  disabled?: boolean;
  //necesito formatearlo?
  format_onBlur?: (text: string) => string | number;
  format_onInput?: (text: string) => string | number;
};
export default Props_Datalist;
