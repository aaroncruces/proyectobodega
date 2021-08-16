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
  activateUbicacion,
  deactivateUbicacion,
  setUbicacion,
} from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import {
  activateDescripcion,
  deactivateDescripcion,
  setDescripcion,
} from "../redux/productParameters/descripcion/descripcionActionCreators";
import {
  activateCodigo_barras,
  deactivateCodigo_barras,
  setCodigo_barras,
} from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import {
  cachedProductListFromState,
  codigo_barrasFromState,
  descripcionFromState,
  filteredProductListFromState,
  marcaFromState,
  modeloActiveFromState,
  modeloFromState,
  skuFromState,
  ubicacionFromState,
} from "../redux/StateValueExtractor";
import Props_Datalist from "./type_props_Datalist";
import State_Datalist from "./type_State_Datalist";
import lowerCase from "voca/lower_case";
import trim from "voca/trim";
import { setCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import { setPrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";

//TODO: move to the datalist itself

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
  setDatalistText_LockUnlock(filteredListWithValue, props);
  setInvalidMessage(props, inputValue, stateSetter, currentState);
};

export const execOnBlur = (
  props: Props_Datalist,
  inputValue: string,
  currentState: State_Datalist,
  stateSetter: (stateDatalist: State_Datalist) => any
): void => {
  //idk
};

export const execOnFocus = (
  props: Props_Datalist,
  inputValue: string
): void => {
  rebuilFilteredListFromCache_IgnoringCurrentDatalist(props);
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
  valueCodigoBarrasParam: codigo_barrasFromState(state),
  valueDescripcionParam: descripcionFromState(state),
  valueUbicacionParam: ubicacionFromState(state),
  modeloParamActive: modeloActiveFromState(state),
  listOfData:
    !!cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? listOfDataFromCachedProductList(state, paramName)
      : filteredProductListFromState(state)
      ? listOfDataFromFilteredProductList(state, paramName)
      : ["Cargando..."],
});

function setInvalidMessage(
  props: Props_Datalist,
  inputValue: string,
  stateSetter: (stateDatalist: State_Datalist) => any,
  currentState: State_Datalist
) {
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
}

function listOfDataFromFilteredProductList(
  state: any,
  paramName: ParameterName
): string[] {
  return Array.from(
    new Set(
      filteredProductListFromState(state)
        .map((product: Product) => product[translateParameterName(paramName)])
        .filter((value) => value != "")
    )
  );
}

function listOfDataFromCachedProductList(
  state: any,
  paramName: ParameterName
): string[] {
  return Array.from(
    new Set(
      cachedProductListFromState(state)
        .map((product: Product) => product[translateParameterName(paramName)])
        .filter((value) => value != "")
    )
  );
}
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

  updateUbicacion: (ubicacion: string) => dispatch(setUbicacion(ubicacion)),
  activateUbicacion: () => dispatch(activateUbicacion()),
  deactivateUbicacion: () => dispatch(deactivateUbicacion()),

  updateDescripcion: (descripcion: string) =>
    dispatch(setDescripcion(descripcion)),
  activateDescripcion: () => dispatch(activateDescripcion()),
  deactivateDescripcion: () => dispatch(deactivateDescripcion()),

  updateCodigoBarras: (descripcion: string) =>
    dispatch(setCodigo_barras(descripcion)),
  activateCodigoBarras: () => dispatch(activateCodigo_barras()),
  deactivateCodigoBarras: () => dispatch(deactivateCodigo_barras()),

  updateCantidad: (cantidad: number) => dispatch(setCantidad(cantidad)),
  updatePrecioNeto: (precio: number) => dispatch(setPrecio_venta_neto(precio)),
});

const availableValuesOnList = (
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
  props.paramName != ParameterName.UBICACION && props.deactivateUbicacion();
  props.paramName != ParameterName.DESCRIPCION && props.deactivateDescripcion();
  props.paramName != ParameterName.CODIGO_BARRAS &&
    props.deactivateCodigoBarras();
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

const setDatalistText_LockUnlock = (
  currentFilteredList: Product[],
  props: Props_Datalist
): void => {
  const paramNameCurrentDatalist = props.paramName;
  lockUnlockFillSku(paramNameCurrentDatalist, currentFilteredList, props);
  lockUnlockFillModelo(paramNameCurrentDatalist, currentFilteredList, props);
  lockUnlockFillMarca(paramNameCurrentDatalist, currentFilteredList, props);
  lockUnlockFillUbicacion(paramNameCurrentDatalist, currentFilteredList, props);
  lockUnlockFillDescripcion(
    paramNameCurrentDatalist,
    currentFilteredList,
    props
  );
  lockUnlockFillCodigoBarras(
    paramNameCurrentDatalist,
    currentFilteredList,
    props
  );
  fillCantidadAndPrecioFromFilteredList(currentFilteredList, props);
};

function lockUnlockFillSku(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.SKU) {
    const listOfAvailableSku = availableValuesOnList(
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
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateSku();
    }
  }
}

function lockUnlockFillModelo(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.MODELO) {
    const listOfAvailableModelo = availableValuesOnList(
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
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateModelo();
    }
  }
}

function lockUnlockFillMarca(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.MARCA) {
    const listOfAvailableMarca = availableValuesOnList(
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
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateMarca();
    }
  }
}

function lockUnlockFillUbicacion(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.UBICACION) {
    const listOfAvailableUbicacion = availableValuesOnList(
      currentFilteredList,
      ParameterName.UBICACION
    );
    if (listOfAvailableUbicacion.length == 0) {
      props.updateUbicacion("");
    }
    if (listOfAvailableUbicacion.length == 1) {
      props.deactivateUbicacion();
      props.updateUbicacion(listOfAvailableUbicacion[0]);
    }
    if (listOfAvailableUbicacion.length > 1) {
      props.activateUbicacion();
    }
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateUbicacion();
    }
  }
}

function lockUnlockFillDescripcion(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.DESCRIPCION) {
    const listOfAvailableDescripcion = availableValuesOnList(
      currentFilteredList,
      ParameterName.DESCRIPCION
    );
    if (listOfAvailableDescripcion.length == 0) {
      props.updateDescripcion("");
    }
    if (listOfAvailableDescripcion.length == 1) {
      props.deactivateDescripcion();
      props.updateDescripcion(listOfAvailableDescripcion[0]);
    }
    if (listOfAvailableDescripcion.length > 1) {
      props.activateDescripcion();
    }
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateDescripcion();
    }
  }
}

function lockUnlockFillCodigoBarras(
  paramNameCurrentDatalist: ParameterName,
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (paramNameCurrentDatalist != ParameterName.CODIGO_BARRAS) {
    const listOfAvailableCodigoBarras = availableValuesOnList(
      currentFilteredList,
      ParameterName.CODIGO_BARRAS
    );
    if (listOfAvailableCodigoBarras.length == 0) {
      props.updateCodigoBarras("");
    }
    if (listOfAvailableCodigoBarras.length == 1) {
      props.deactivateCodigoBarras();
      props.updateCodigoBarras(listOfAvailableCodigoBarras[0]);
    }
    if (listOfAvailableCodigoBarras.length > 1) {
      props.activateCodigoBarras();
    }
  } else {
    if (currentFilteredList.length == 1) {
      props.deactivateCodigoBarras();
    }
  }
}

function fillCantidadAndPrecioFromFilteredList(
  currentFilteredList: Product[],
  props: Props_Datalist
) {
  if (currentFilteredList.length == 1) {
    props.updateCantidad(currentFilteredList[0].cantidad);
    props.updatePrecioNeto(currentFilteredList[0].precio_venta_neto);
  }
}

const rebuilFilteredListFromCache_IgnoringCurrentDatalist = (
  props: Props_Datalist
): void => {
  const valueSkuText = props.valueSkuParam;
  const valueModeloText = props.valueModeloParam;
  const valueMarcaText = props.valueMarcaParam;
  const valueCodigoBarrasText = props.valueCodigoBarrasParam;
  const valueUbicacionText = props.valueUbicacionParam;
  const valueDescripcionText = props.valueDescripcionParam;
  const reFilteredProductList = props.cachedProductList.filter((product) => {
    let productValid = true;
    productValid = otherDatalist_SkuMatches(
      props,
      productValid,
      product,
      valueSkuText
    );
    productValid = otherDatalist_ModeloMatches(
      props,
      productValid,
      product,
      valueModeloText
    );
    productValid = otherDatalist_MarcaMatches(
      props,
      productValid,
      product,
      valueMarcaText
    );
    productValid = otherDatalist_CodigoBarrasMatches(
      props,
      productValid,
      product,
      valueCodigoBarrasText
    );
    productValid = otherDatalist_DescripcionMatches(
      props,
      productValid,
      product,
      valueDescripcionText
    );
    productValid = otherDatalist_UbicacionMatches(
      props,
      productValid,
      product,
      valueUbicacionText
    );
    return productValid;
  });
  props.updateFilteredProductList(reFilteredProductList);
};

function otherDatalist_SkuMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueSkuText: string
) {
  if (props.paramName != ParameterName.SKU) {
    productValid =
      productValid && (product.sku == valueSkuText || valueSkuText == "");
  }
  return productValid;
}

function otherDatalist_ModeloMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueModeloText: string
) {
  if (props.paramName != ParameterName.MODELO) {
    productValid =
      productValid &&
      (product.modelo == valueModeloText || valueModeloText == "");
  }
  return productValid;
}

function otherDatalist_MarcaMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueMarcaText: string
) {
  if (props.paramName != ParameterName.MARCA) {
    productValid =
      productValid && (product.marca == valueMarcaText || valueMarcaText == "");
  }
  return productValid;
}

function otherDatalist_CodigoBarrasMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueCodigoBarrasText: string
) {
  if (props.paramName != ParameterName.CODIGO_BARRAS) {
    productValid =
      productValid &&
      (product.codigo_barras == valueCodigoBarrasText ||
        valueCodigoBarrasText == "");
  }
  return productValid;
}

function otherDatalist_DescripcionMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueDescripcionText: string
) {
  if (props.paramName != ParameterName.DESCRIPCION) {
    productValid =
      productValid &&
      (product.descripcion == valueDescripcionText ||
        valueDescripcionText == "");
  }
  return productValid;
}

function otherDatalist_UbicacionMatches(
  props: Props_Datalist,
  productValid: boolean,
  product: Product,
  valueUbicacionText: string
) {
  if (props.paramName != ParameterName.UBICACION) {
    productValid =
      productValid &&
      (product.ubicacion == valueUbicacionText || valueUbicacionText == "");
  }
  return productValid;
}
