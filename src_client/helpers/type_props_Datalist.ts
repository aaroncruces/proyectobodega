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
  listOfData?: string[];
  //dispatchers
  updateParameterStoreReducer?: (string) => any;
  updateFilteredProductList?: (string) => any;
  updateSku?: (sku: string) => any;
  activateSku?: () => any;
  deactivateSku?: () => any;
  updateModelo?: (modelo: string) => any;
  activateModelo?: () => any;
  deactivateModelo?: () => any;
  activateMarca?: () => any;
  deactivateMarca?: () => any;
};
export default Props_Datalist;
