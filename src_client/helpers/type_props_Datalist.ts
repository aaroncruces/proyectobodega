import ActiveParameterName from "../redux/productParameters/activeParameter/enum_ActiveParameterName";

type Props_Datalist = {
  textDatalist?: string;
  listOfData?: string[] | number[];
  updateStoreValueReducer?: (string) => any;
  updateStoreActiveParameterReducer?: (
    activeParameter: ActiveParameterName
  ) => any;
  cssClassContainer?: string;
  invalidComparator?: (text: string) => string;
  name?: string;
  labelBody?: string;
  disabled?: boolean;
  format_onBlur?: (text: string) => string | number;
  format_onInput?: (text: string) => string | number;
  parameterName?: ActiveParameterName;
};
export default Props_Datalist;
