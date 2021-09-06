import React, { Component } from "react";
import { connect } from "react-redux";
import { lowerCase, trim } from "voca";
import Product from "../../src_server/types/Product";
import Props_Datalist from "./prop_types/type_props_Datalist";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { setFilteredProductList } from "../redux/filteredProductList/filteredProductListActionCreators";
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
import { setCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import { setPrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";

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

class Datalist extends Component<Props_Datalist> {
  constructor(props) {
    super(props);
  }

  private onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value).toString();
    this.props.updateParameterStoreReducer(inputValue);

    if (!this.props.filteredProductList) {
      return;
    }

    this.lockDatalistsExcept();
    this.setDatalistText_LockUnlock(inputValue);
  };

  private setDatalistText_LockUnlock = (inputValue: string): void => {
    const filteredListWithCurrentValue = this.productListWithValue(inputValue);
    const paramNameCurrentDatalist = this.props.paramName;
    const lockCurrentParam =
      this.productListThatContains(inputValue).length == 1;
    this.lockUnlockFillSku(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.lockUnlockFillModelo(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.lockUnlockFillMarca(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.lockUnlockFillUbicacion(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.lockUnlockFillDescripcion(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.lockUnlockFillCodigoBarras(
      paramNameCurrentDatalist,
      filteredListWithCurrentValue,
      lockCurrentParam
    );
    this.fillCantidadAndPrecioFromFilteredList(filteredListWithCurrentValue);
  };

  private lockUnlockFillSku = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.SKU) {
      const listOfAvailableSku = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.SKU
      );
      if (listOfAvailableSku.length == 0) {
        this.props.updateSku("");
      }
      if (listOfAvailableSku.length == 1) {
        this.props.deactivateSku();
        this.props.updateSku(listOfAvailableSku[0]);
      }
      if (listOfAvailableSku.length > 1) {
        this.props.activateSku();
      }
    } else {
      lockCurrentParam && this.props.deactivateSku();
    }
  };

  private lockUnlockFillCodigoBarras = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.CODIGO_BARRAS) {
      const listOfAvailableCodigoBarras = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.CODIGO_BARRAS
      );
      if (listOfAvailableCodigoBarras.length == 0) {
        this.props.updateCodigoBarras("");
      }
      if (listOfAvailableCodigoBarras.length == 1) {
        this.props.deactivateCodigoBarras();
        this.props.updateCodigoBarras(listOfAvailableCodigoBarras[0]);
      }
      if (listOfAvailableCodigoBarras.length > 1) {
        this.props.activateCodigoBarras();
      }
    } else {
      lockCurrentParam && this.props.deactivateCodigoBarras();
    }
  };

  private lockUnlockFillModelo = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.MODELO) {
      const listOfAvailableModelo = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.MODELO
      );
      if (listOfAvailableModelo.length == 0) {
        this.props.updateModelo("");
      }
      if (listOfAvailableModelo.length == 1) {
        this.props.deactivateModelo();
        this.props.updateModelo(listOfAvailableModelo[0]);
      }
      if (listOfAvailableModelo.length > 1) {
        this.props.activateModelo();
      }
    } else {
      lockCurrentParam && this.props.deactivateModelo();
    }
  };

  private lockUnlockFillMarca = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.MARCA) {
      const listOfAvailableMarca = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.MARCA
      );

      if (listOfAvailableMarca.length == 0) {
        this.props.updateMarca("");
      }
      if (listOfAvailableMarca.length == 1) {
        this.props.deactivateMarca();
        this.props.updateMarca(listOfAvailableMarca[0]);
      }
      if (listOfAvailableMarca.length > 1) {
        this.props.activateMarca();
      }
    } else {
      lockCurrentParam && this.props.deactivateMarca();
    }
  };

  private lockUnlockFillUbicacion = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.UBICACION) {
      const listOfAvailableUbicacion = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.UBICACION
      );
      if (listOfAvailableUbicacion.length == 0) {
        this.props.updateUbicacion("");
      }
      if (listOfAvailableUbicacion.length == 1) {
        this.props.deactivateUbicacion();
        this.props.updateUbicacion(listOfAvailableUbicacion[0]);
      }
      if (listOfAvailableUbicacion.length > 1) {
        this.props.activateUbicacion();
      }
    } else {
      lockCurrentParam && this.props.deactivateUbicacion();
    }
  };

  private lockUnlockFillDescripcion = (
    paramNameCurrentDatalist: ParameterName,
    currentFilteredList: Product[],
    lockCurrentParam: boolean
  ) => {
    if (paramNameCurrentDatalist != ParameterName.DESCRIPCION) {
      const listOfAvailableDescripcion = this.availableValuesOnList(
        currentFilteredList,
        ParameterName.DESCRIPCION
      );
      if (listOfAvailableDescripcion.length == 0) {
        this.props.updateDescripcion("");
      }
      if (listOfAvailableDescripcion.length == 1) {
        this.props.deactivateDescripcion();
        this.props.updateDescripcion(listOfAvailableDescripcion[0]);
      }
      if (listOfAvailableDescripcion.length > 1) {
        this.props.activateDescripcion();
      }
    } else {
      lockCurrentParam && this.props.deactivateDescripcion();
    }
  };

  private fillCantidadAndPrecioFromFilteredList = (
    currentFilteredList: Product[]
  ) => {
    if (currentFilteredList.length == 1) {
      this.props.updateCantidad(currentFilteredList[0].cantidad);
      this.props.updatePrecioNeto(currentFilteredList[0].precio_venta_neto);
    }
  };

  private availableValuesOnList = (
    productList: Product[],
    paramName: ParameterName
  ): string[] => {
    const trueParameterName = this.translateParameterName(paramName);
    return Array.from(
      new Set(
        productList
          .map((product) => product[trueParameterName])
          .filter((paramValue: string | number) => paramValue != "")
      )
    );
  };

  private lockDatalistsExcept = (): void => {
    this.props.paramName != ParameterName.SKU && this.props.deactivateSku();
    this.props.paramName != ParameterName.MODELO &&
      this.props.deactivateModelo();
    this.props.paramName != ParameterName.MARCA && this.props.deactivateMarca();
    this.props.paramName != ParameterName.UBICACION &&
      this.props.deactivateUbicacion();
    this.props.paramName != ParameterName.DESCRIPCION &&
      this.props.deactivateDescripcion();
    this.props.paramName != ParameterName.CODIGO_BARRAS &&
      this.props.deactivateCodigoBarras();
  };

  private productListWithValue = (paramValue: string): Product[] => {
    const productList = this.props.filteredProductList;
    const paramName = this.props.paramName;
    const trueParameterName = this.translateParameterName(paramName);
    return productList.filter(
      (product: Product) => product[trueParameterName] == paramValue
    );
  };
  private productListThatContains = (paramValue: string): Product[] => {
    const productList = this.props.filteredProductList;
    const paramName = this.props.paramName;
    const trueParameterName = this.translateParameterName(paramName);
    return productList.filter((product: Product) =>
      product[trueParameterName].includes(paramValue)
    );
  };
  private getInvalidMessage = (): string =>
    !this.listContains(
      this.props.filteredProductList,
      this.props.paramName,
      this.props.textCurrentParam.toString()
    )
      ? `${this.props.labelBody} Invalido`
      : "";

  private listContains = (
    productList: Product[],
    paramName: ParameterName,
    paramValue: string
  ): boolean => {
    const trueParameterName = this.translateParameterName(paramName);
    const listContainingParam = productList.filter((product) =>
      lowerCase(trim(product[trueParameterName])).includes(
        lowerCase(trim(paramValue))
      )
    );
    return listContainingParam.length > 0;
  };
  private listHasExact = (
    productList: Product[],
    paramName: ParameterName,
    paramValue: string
  ): boolean => {
    const trueParameterName = this.translateParameterName(paramName);
    const listContainingParam = productList.filter(
      (product) =>
        lowerCase(trim(product[trueParameterName])) ==
        lowerCase(trim(paramValue))
    );
    return listContainingParam.length > 0;
  };
  private translateParameterName = (paramName: ParameterName): string => {
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

  onBlur_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onBlur(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);
    const productValid = this.listHasExact(
      this.props.filteredProductList,
      this.props.paramName,
      this.props.textCurrentParam.toString()
    );
    if (productValid) {
      this.props.deactivateCurrentDatalist();
    }
  };

  private onFocus_Datalist = (event: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onBlur(event.target.value);
    this.rebuilFilteredListFromCache_IgnoringCurrentDatalist();
  };

  private rebuilFilteredListFromCache_IgnoringCurrentDatalist = (): void => {
    const valueSkuText = this.props.valueSkuParam;
    const valueModeloText = this.props.valueModeloParam;
    const valueMarcaText = this.props.valueMarcaParam;
    const valueCodigoBarrasText = this.props.valueCodigoBarrasParam;
    const valueUbicacionText = this.props.valueUbicacionParam;
    const valueDescripcionText = this.props.valueDescripcionParam;
    const reFilteredProductList = this.props.cachedProductList.filter(
      (product) => {
        let productValid = true;
        productValid = this.otherDatalist_SkuMatches(
          productValid,
          product,
          valueSkuText
        );
        productValid = this.otherDatalist_ModeloMatches(
          productValid,
          product,
          valueModeloText
        );
        productValid = this.otherDatalist_MarcaMatches(
          productValid,
          product,
          valueMarcaText
        );
        productValid = this.otherDatalist_CodigoBarrasMatches(
          productValid,
          product,
          valueCodigoBarrasText
        );
        productValid = this.otherDatalist_DescripcionMatches(
          productValid,
          product,
          valueDescripcionText
        );
        productValid = this.otherDatalist_UbicacionMatches(
          productValid,
          product,
          valueUbicacionText
        );
        return productValid;
      }
    );
    this.props.updateFilteredProductList(reFilteredProductList);
  };

  private otherDatalist_SkuMatches = (
    productValid: boolean,
    product: Product,
    valueSkuText: string
  ) => {
    if (this.props.paramName != ParameterName.SKU) {
      productValid =
        productValid && (product.sku == valueSkuText || valueSkuText == "");
    }
    return productValid;
  };

  private otherDatalist_ModeloMatches = (
    productValid: boolean,
    product: Product,
    valueModeloText: string
  ) => {
    if (this.props.paramName != ParameterName.MODELO) {
      productValid =
        productValid &&
        (product.modelo == valueModeloText || valueModeloText == "");
    }
    return productValid;
  };

  private otherDatalist_MarcaMatches = (
    productValid: boolean,
    product: Product,
    valueMarcaText: string
  ) => {
    if (this.props.paramName != ParameterName.MARCA) {
      productValid =
        productValid &&
        (product.marca == valueMarcaText || valueMarcaText == "");
    }
    return productValid;
  };

  private otherDatalist_CodigoBarrasMatches = (
    productValid: boolean,
    product: Product,
    valueCodigoBarrasText: string
  ) => {
    if (this.props.paramName != ParameterName.CODIGO_BARRAS) {
      productValid =
        productValid &&
        (product.codigo_barras == valueCodigoBarrasText ||
          valueCodigoBarrasText == "");
    }
    return productValid;
  };

  private otherDatalist_DescripcionMatches = (
    productValid: boolean,
    product: Product,
    valueDescripcionText: string
  ) => {
    if (this.props.paramName != ParameterName.DESCRIPCION) {
      productValid =
        productValid &&
        (product.descripcion == valueDescripcionText ||
          valueDescripcionText == "");
    }
    return productValid;
  };

  private otherDatalist_UbicacionMatches = (
    productValid: boolean,
    product: Product,
    valueUbicacionText: string
  ) => {
    if (this.props.paramName != ParameterName.UBICACION) {
      productValid =
        productValid &&
        (product.ubicacion == valueUbicacionText || valueUbicacionText == "");
    }
    return productValid;
  };

  private listOfDataFromFilteredProductList = (): string[] => {
    return Array.from(
      new Set(
        this.props.filteredProductList
          .map(
            (product: Product) =>
              product[this.translateParameterName(this.props.paramName)]
          )
          .filter((value) => value != "")
      )
    );
  };

  render() {
    const invalidMessage = this.getInvalidMessage();
    return (
      <div
        className={this.props.cssClassContainer}
        id={this.props.name + "-datalist"}
      >
        <label htmlFor={this.props.name} className="form-label">
          {this.props.labelBody}
        </label>
        <input
          name={this.props.name}
          type="text"
          className={
            invalidMessage == "" ? "form-control" : "form-control is-invalid"
          }
          value={this.props.textCurrentParam}
          onInput={this.onInput_Datalist.bind(this)}
          onBlur={this.onBlur_Datalist}
          onFocus={this.onFocus_Datalist}
          disabled={!this.props.enabled}
          list={this.props.name + "-datalistOptions"}
          id={this.props.name + "-iddatalist"}
        />
        <datalist id={this.props.name + "-datalistOptions"}>
          {this.listOfDataFromFilteredProductList().map(
            (data: string | number, index) => (
              <option key={index} value={data} />
            )
          )}
        </datalist>
        {invalidMessage != undefined && invalidMessage != "" && (
          <div className="invalid-feedback">{invalidMessage}</div>
        )}
      </div>
    );
  }
}
const emptyProducts_loading: Product = {
  sku: "",
  codigo_barras: "",
  modelo: "",
  cantidad: 0,
  ubicacion: "",
  marca: "",
  precio_venta_neto: 0,
  descripcion: "",
};
const mapStateToProps = (state): Props_Datalist => ({
  cachedProductList: cachedProductListFromState(state),
  filteredProductList:
    !cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? [emptyProducts_loading]
      : cachedProductListFromState(state) &&
        !filteredProductListFromState(state)
      ? cachedProductListFromState(state)
      : filteredProductListFromState(state), //can be Undefined
  valueSkuParam: skuFromState(state),
  valueModeloParam: modeloFromState(state),
  valueMarcaParam: marcaFromState(state),
  valueCodigoBarrasParam: codigo_barrasFromState(state),
  valueDescripcionParam: descripcionFromState(state),
  valueUbicacionParam: ubicacionFromState(state),
  modeloParamActive: modeloActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
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
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
