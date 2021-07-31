import React, { Component } from "react";
import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  filteredProductListFromState,
  modeloActiveFromState,
  modeloFromState,
  skuActiveFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import { lowerCase } from "voca";
import { setFilteredProductList } from "../redux/filteredProductList/filteredProductListActionCreators";
import {
  activateModelo,
  deactivateModelo,
} from "../redux/productParameters/modelo/modeloActionCreators";

/**
 * todo params inserted before fetch
 * todo subsets of param string
 */
class Datalist_sku extends Datalist {
  onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);

    if (!this.props.filteredProductList) {
      return;
    }
    //1. bloquear otros params. ¿¿¿derivar a helper???
    deactivateModelo;
    //...

    //3. buscar segun params actuales
    //3.0 todo vacio
    //const skuEmpty = inputValue == "";
    const modeloText = this.props.valueModeloParam;
    let filteredList = this.props.filteredProductList.filter(
      (product: Product) => {
        let approvedProduct = true;
        approvedProduct =
          (approvedProduct && modeloText == "") ||
          (approvedProduct && product.modelo == modeloText);
        return approvedProduct;
      }
    );
    //
  };

  onBlur_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.updateParameterStoreReducer(
      this.props.format_onBlur(event.target.value)
    );
  };
}

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  format_onInput: onInput,
  format_onBlur: onBlur,
  enabled: skuActiveFromState(state),
  cachedProductList: cachedProductListFromState(state),
  filteredProductList:
    cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? cachedProductListFromState(state)
      : filteredProductListFromState(state),
  valueModeloParam: modeloFromState(state),
  modeloParamActive: modeloActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (sku: string) => dispatch(setSku(sku)),
  updateFilteredProductList: (productList: Product[]) =>
    dispatch(setFilteredProductList(productList)),
  activateModelo: () => dispatch(activateModelo()),
  deactivateModelo: () => dispatch(deactivateModelo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist_sku);
