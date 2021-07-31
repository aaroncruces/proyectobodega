import Product from "../../src_server/types/Product";

type Props_Datalist = {
  cssClassContainer?: string;
  name?: string;
  labelBody?: string;
  format_onInput?: (text: string) => string | number;
  format_onBlur?: (text: string) => string | number;
  //from redux store
  enabled?: boolean;
  cachedProductList?: Product[];
  filteredProductList?: Product[];
  textCurrentParam?: string;
  valueSkuParam?: string;
  skuParamActive?: boolean;
  valueModeloParam?: string;
  modeloParamActive?: boolean;
  valueMarcaParam?: string;
  marcaParamActive?: boolean;
  valueCantidadParam?: number;
  cantidadParamActive?: boolean;

  //dispatchers
  updateParameterStoreReducer?: (string) => any;
  updateFilteredProductList?: (string) => any;
  activateSKU?: (any) => any;
  deactivateSKU?: (any) => any;
  activateModelo?: (any) => any;
  deactivateModelo?: (any) => any;
  activateMarca?: (any) => any;
  deactivateMarca?: (any) => any;
};
export default Props_Datalist;
