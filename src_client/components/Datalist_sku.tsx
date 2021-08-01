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

/**
 * todo params inserted before fetch, deactivate all
 * todo subsets of param string
 * !!! voy a bloquear todo si encuentro 1 producto, y a desbloquear los elegibles
 * !!! despues veo si implemento un stack para desbloqueos consecutivos
 */
class Datalist_sku extends Datalist {
  onInput_Datalist = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = this.props.format_onInput(event.target.value);
    this.props.updateParameterStoreReducer(inputValue);

    if (!this.props.filteredProductList) {
      return;
    }
    //colectar valores store
    const skuValue = this.props.valueSkuParam;
    const modeloValue = this.props.valueModeloParam;
    const marcaValue = this.props.valueMarcaParam;
    const cantidadValue = this.props.valueCantidadParam;

    //1. si inputValue="" desbloquear params que tengan multiples opciones en la fpl, o, todo
    if (
      skuValue == "" &&
      modeloValue == "" &&
      marcaValue == "" &&
      cantidadValue == 0
    ) {
      this.props.activateSku();
      this.props.activateModelo();
      //desbloquear y salir
    }
    if (inputValue == "") {
      if (modeloValue)
        if (0) {
          //revisar si los params son desbloqueables
        }
    }
    //retornar

    //2. bloquear otros params. ¿¿¿derivar a helper???
    this.props.deactivateModelo();
    //...

    //si hay otros valores, en otros params, se deberia  dar por sentado que fpl está
    //estoy buscando por el actual param,
    //se asume que si hay otros params, ya se encuentra reducida la lista;

    let filteredList = this.props.filteredProductList.filter(
      (product: Product) => product.sku == inputValue
    );

    if (filteredList.length == 0) {
      //si fpl=0 es incorrecto,  aun sigo escribiendo (a menos que on blur, entonces error)
    }
    if (filteredList.length == 1) {
      //si fpl=1 el item es unico, llenar los otros params, no desbloquear
      const selectedProduct = filteredList[0];
      this.props.updateModelo(selectedProduct.modelo);
    }
    //no sku o cb
    if (filteredList.length > 1) {
      // si fpl multiple, seleccionar qué elementos desbloquear,
      // que elementos dejar bloqueados pero escritos
    }
    // si borro,reiniciar fpl, desbloquear aquellos params que son elegibles
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
  enabled: skuActiveFromState(state), // && cachedProductListFromState(state)
  cachedProductList: cachedProductListFromState(state),
  filteredProductList:
    cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? cachedProductListFromState(state)
      : filteredProductListFromState(state), //can be Undefined
  listOfData:
    cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? cachedProductListFromState(state).map((product: Product) => product.sku)
      : filteredProductListFromState(state)
      ? filteredProductListFromState(state).map(
          (product: Product) => product.sku
        )
      : ["Cargando..."],
  valueSkuParam: skuFromState(state),
  valueModeloParam: modeloFromState(state),
  valueMarcaParam: marcaFromState(state),
  valueCantidadParam: cantidadFromState(state),
  modeloParamActive: modeloActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (sku: string) => dispatch(setSku(sku)),
  updateFilteredProductList: (productList: Product[]) =>
    dispatch(setFilteredProductList(productList)),
  updateSku: (sku: string) => dispatch(setSku(sku)),
  activateSku: () => dispatch(activateSku()),
  deactivateSku: () => dispatch(deactivateSku()),
  updateModelo: (modelo: string) => dispatch(setModelo(modelo)),
  activateModelo: () => dispatch(activateModelo()),
  deactivateModelo: () => dispatch(deactivateModelo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist_sku);
