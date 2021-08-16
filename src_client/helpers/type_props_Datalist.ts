import Product from "../../src_server/types/Product";
import ParameterName from "../redux/productParameters/enum_ParameterName";

type Props_Datalist = {
  cssClassContainer?: string;
  name?: string;
  labelBody?: string;
  paramName?: ParameterName;
  format_onInput?: (text: string) => string | number;
  format_onBlur?: (text: string) => string | number;
  defaultPlaceholder?: string;

  //from redux store
  enabled?: boolean;
  cachedProductList?: Product[];
  filteredProductList?: Product[];
  textCurrentParam?: string | number;

  valueSkuParam?: string;
  skuParamActive?: boolean;

  valueModeloParam?: string;
  modeloParamActive?: boolean;

  valueMarcaParam?: string;
  marcaParamActive?: boolean;

  valueCodigoBarrasParam?: string;
  codigoBarrasParamActive?: boolean;

  valueDescripcionParam?: string;
  descripcionParamActive?: boolean;

  valueUbicacionParam?: string;
  ubicacionParamActive?: boolean;

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

  updateMarca?: (marca: string) => any;
  activateMarca?: () => any;
  deactivateMarca?: () => any;

  updateCodigoBarras?: (codigo_barras: string) => any;
  activateCodigoBarras?: () => any;
  deactivateCodigoBarras?: () => any;

  updateUbicacion?: (ubicacion: string) => any;
  activateUbicacion?: () => any;
  deactivateUbicacion?: () => any;

  updateDescripcion?: (descripcion: string) => any;
  activateDescripcion?: () => any;
  deactivateDescripcion?: () => any;

  updateCantidad?: (cantidad: number) => any;
  updatePrecioNeto?: (cantidad: number) => any;
};
export default Props_Datalist;
