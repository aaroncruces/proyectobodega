import Product from "../../src_server/types/Product";
import { setFilteredProductList } from "../redux/filteredProductList/filteredProductListActionCreators";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import {
  activateMarca,
  deactivateMarca,
  setMarca,
} from "../redux/productParameters/marca/marcaActionCreators";
import {
  activateModelo,
  deactivateModelo,
  setModelo,
} from "../redux/productParameters/modelo/modeloActionCreators";
import {
  activateSku,
  deactivateSku,
  setSku,
} from "../redux/productParameters/sku/skuActionCreators";
import {
  cachedProductListFromState,
  cantidadFromState,
  codigo_barrasFromState,
  descripcionFromState,
  filteredProductListFromState,
  marcaFromState,
  modeloActiveFromState,
  modeloFromState,
  precioVentaNetoFromState,
  skuFromState,
  ubicacionFromState,
} from "../redux/StateValueExtractor";
import Props_Datalist from "./type_props_Datalist";
import State_Datalist from "./type_State_Datalist";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";

export const execOnInput = (
  props: Props_Datalist,
  inputValue: string,
  currentState: State_Datalist,
  stateSetter: (stateDatalist: State_Datalist) => any
) => {
  if (!props.filteredProductList) {
    return;
  }

  lockDatalistsExcept(props);

  const filteredListWithValue = filterProductListBy(
    props.filteredProductList,
    props.paramName,
    inputValue
  );

  setDatalists_LockUnlockOptions(filteredListWithValue, props, props.paramName);

  if (!listContains(props.filteredProductList, props.paramName, inputValue)) {
    stateSetter({
      ...currentState,
      invalidMessage: `${props.labelBody} Invalido`,
    });
  } else {
    stateSetter({
      ...currentState,
      invalidMessage: "",
    });
  }
};
export const execOnBlur = (
  props: Props_Datalist,
  inputValue: string,
  currentState: State_Datalist,
  stateSetter: (stateDatalist: State_Datalist) => any
): void => {
  const filteredListWithValue = filterProductListBy(
    props.filteredProductList,
    props.paramName,
    inputValue
  );

  if (filteredListWithValue.length == 0) {
  }
};
export const execOnFocus = (
  props: Props_Datalist,
  inputValue: string
): void => {
  rebuilFilteredListFromCache(props);
};

const rebuilFilteredListFromCache = (props: Props_Datalist): void => {
  const valueSkuText = props.valueSkuParam;
  const valueModeloText = props.valueModeloParam;
  const valueMarcaText = props.valueMarcaParam;
  const reFilteredProductList = props.cachedProductList.filter((product) => {
    let productValid = true;
    if (props.paramName != ParameterName.SKU) {
      productValid =
        productValid && (product.sku == valueSkuText || valueSkuText == "");
    }
    if (props.paramName != ParameterName.MODELO) {
      productValid =
        productValid &&
        (product.modelo == valueModeloText || valueModeloText == "");
    }
    if (props.paramName != ParameterName.MARCA) {
      productValid =
        productValid &&
        (product.marca == valueMarcaText || valueMarcaText == "");
    }
    //!!!...etc
    return productValid;
  });
  props.updateFilteredProductList(reFilteredProductList);
};

const availableParamsOnList = (
  productList: Product[],
  paramName: ParameterName
): string[] => {
  const trueParameterName = translateParameterName(paramName);
  return Array.from(
    new Set(
      productList
        .map((product) => product[trueParameterName])
        .filter((paramValue: string | number) => paramValue != "")
    )
  );
};

const translateParameterName = (paramName: ParameterName): string => {
  return paramName == ParameterName.SKU
    ? "sku"
    : paramName == ParameterName.CODIGO_BARRAS
    ? "codigo_barras"
    : paramName == ParameterName.MODELO
    ? "modelo"
    : paramName == ParameterName.MARCA
    ? "marca"
    : paramName == ParameterName.CANTIDAD
    ? "cantidad"
    : paramName == ParameterName.DESCRIPCION
    ? "descripcion"
    : paramName == ParameterName.UBICACION
    ? "ubicacion"
    : paramName == ParameterName.PRECIO_VENTA_NETO
    ? "precio_venta_neto"
    : "";
};

const lockDatalistsExcept = (props: Props_Datalist): void => {
  props.paramName != ParameterName.SKU && props.deactivateSku();
  props.paramName != ParameterName.MODELO && props.deactivateModelo();
  props.paramName != ParameterName.MARCA && props.deactivateMarca();
  //!!!...etc
};

const filterProductListBy = (
  productList: Product[],
  paramName: ParameterName,
  paramValue: string
): Product[] => {
  const trueParameterName = translateParameterName(paramName);
  return productList.filter(
    (product: Product) => product[trueParameterName] == paramValue
  );
};
const listContains = (
  productList: Product[],
  paramName: ParameterName,
  paramValue: string
): boolean => {
  const trueParameterName = translateParameterName(paramName);
  const listContainingParam = productList.filter((product) =>
    lowerCase(trim(product[trueParameterName])).includes(
      lowerCase(trim(paramValue))
    )
  );
  return listContainingParam.length > 0;
};

// !!! diferenciate contains (error on input) vs == (error on blur)
const setDatalists_LockUnlockOptions = (
  currentFilteredList: Product[],
  props: Props_Datalist,
  paramName: ParameterName
): void => {
  if (paramName != ParameterName.SKU) {
    const listOfAvailableSku = availableParamsOnList(
      currentFilteredList,
      ParameterName.SKU
    );
    if (listOfAvailableSku.length == 0) {
      props.updateSku("");
    }
    if (listOfAvailableSku.length == 1) {
      props.deactivateSku();
      props.updateSku(listOfAvailableSku[0]);
    }
    if (listOfAvailableSku.length > 1) {
      props.activateSku();
    }
  }
  if (paramName != ParameterName.MODELO) {
    const listOfAvailableModelo = availableParamsOnList(
      currentFilteredList,
      ParameterName.MODELO
    );
    if (listOfAvailableModelo.length == 0) {
      props.updateModelo("");
    }
    if (listOfAvailableModelo.length == 1) {
      props.deactivateModelo();
      props.updateModelo(listOfAvailableModelo[0]);
    }
    if (listOfAvailableModelo.length > 1) {
      props.activateModelo();
    }
  }
  if (paramName != ParameterName.MARCA) {
    const listOfAvailableMarca = availableParamsOnList(
      currentFilteredList,
      ParameterName.MARCA
    );
    if (listOfAvailableMarca.length == 0) {
      props.updateMarca("");
    }
    if (listOfAvailableMarca.length == 1) {
      props.deactivateMarca();
      props.updateMarca(listOfAvailableMarca[0]);
    }
    if (listOfAvailableMarca.length > 1) {
      props.activateMarca();
    }
  }
};

export const commonStateProps = (
  state,
  paramName: ParameterName
): Props_Datalist => ({
  cachedProductList: cachedProductListFromState(state),
  filteredProductList:
    cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? cachedProductListFromState(state)
      : filteredProductListFromState(state), //can be Undefined
  valueSkuParam: skuFromState(state),
  valueModeloParam: modeloFromState(state),
  valueMarcaParam: marcaFromState(state),
  valueCantidadParam: cantidadFromState(state),
  modeloParamActive: modeloActiveFromState(state),
  listOfData:
    !!cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? Array.from(
          new Set(
            cachedProductListFromState(state)
              .map(
                (product: Product) => product[translateParameterName(paramName)]
              )
              .filter((value) => value != "")
          )
        )
      : filteredProductListFromState(state)
      ? Array.from(
          new Set(
            filteredProductListFromState(state)
              .map(
                (product: Product) => product[translateParameterName(paramName)]
              )
              .filter((value) => value != "")
          )
        )
      : ["Cargando..."],
});

export const commonDispatchers = (dispatch: (any) => any): Props_Datalist => ({
  updateFilteredProductList: (productList: Product[]) =>
    dispatch(setFilteredProductList(productList)),
  updateSku: (sku: string) => dispatch(setSku(sku)),
  activateSku: () => dispatch(activateSku()),
  deactivateSku: () => dispatch(deactivateSku()),
  updateModelo: (modelo: string) => dispatch(setModelo(modelo)),
  activateModelo: () => dispatch(activateModelo()),
  deactivateModelo: () => dispatch(deactivateModelo()),
  updateMarca: (marca: string) => dispatch(setMarca(marca)),
  activateMarca: () => dispatch(activateMarca()),
  deactivateMarca: () => dispatch(deactivateMarca()),
});

/*
//colectar valores store
    const skuValue = this.props.valueSkuParam;
    const modeloValue = this.props.valueModeloParam;
    const marcaValue = this.props.valueMarcaParam;
    const cantidadValue = this.props.valueCantidadParam;
*/
