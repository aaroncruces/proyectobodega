import React, { Component } from "react";
import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import {
  activateSku,
  deactivateSku,
  setSku,
} from "../redux/productParameters/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  cantidadFromState,
  filteredProductListFromState,
  marcaFromState,
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
  setModelo,
} from "../redux/productParameters/modelo/modeloActionCreators";
import {
  activateMarca,
  deactivateMarca,
  setMarca,
} from "../redux/productParameters/marca/marcaActionCreators";
import {
  commonDispatchers,
  commonStateProps,
  execOnInput,
  filterProductListBy,
  lockDatalistsExcept,
  setDatalists_LockUnlockOptions,
} from "../helpers/datalist_commons";
import ParameterName from "../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  paramName: ParameterName.SKU,
  format_onInput: onInput,
  format_onBlur: onBlur,
  enabled: skuActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por SKU",
  ...commonStateProps(state, ParameterName.SKU),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (sku: string) => dispatch(setSku(sku)),
  ...commonDispatchers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
