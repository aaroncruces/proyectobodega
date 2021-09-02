import cachedProductListActionTypes from "./cachedProductListActionTypes";
import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import {
  fetchProductos,
  patchProduct,
  postProduct,
} from "../../helpers/server";

import {
  cantidadActiveFromState,
  cantidadFromState,
  codigo_barrasActiveFromState,
  codigo_barrasFromState,
  descripcionActiveFromState,
  descripcionFromState,
  marcaActiveFromState,
  marcaFromState,
  modeloActiveFromState,
  modeloFromState,
  precioVentaBrutoActiveFromState,
  precioVentaNetoActiveFromState,
  precioVentaNetoFromState,
  skuFromState,
  ubicacionActiveFromState,
  ubicacionFromState,
} from "../StateValueExtractor";
import { resetParams } from "../../helpers/resetStoreParamsAndFilteredList";

const setProductListToCache = (payload: Product[]): Action => ({
  type: cachedProductListActionTypes.SET_PRODUCT_LIST_TO_CACHE,
  payload,
});
const pushProductToCache = (payload: Product): Action => ({
  type: cachedProductListActionTypes.PUSH_PRODUCT_TO_CACHE,
  payload,
});

/**
 * Thunk
 */
const fetchProductsFromDBToCache = () => (dispatch) => {
  fetchProductos()
    .then((productos) => {
      dispatch(setProductListToCache(productos));
    })
    .catch((error) => {
      setProductListToCache(undefined);
    });
};

/**
 * Thunk
 */
const postTextToDBAndCache = () => async (dispatch, getState) => {
  const state = getState();
  const currentProduct: Product = {
    sku: skuFromState(state),
    codigo_barras: codigo_barrasFromState(state),
    modelo: modeloFromState(state),
    cantidad: cantidadFromState(state),
    ubicacion: ubicacionFromState(state),
    marca: marcaFromState(state),
    precio_venta_neto: precioVentaNetoFromState(state),
    descripcion: descripcionFromState(state),
  };
  dispatch(pushProductToCache(currentProduct));
  resetParams(dispatch);

  await postProduct(currentProduct)
    .then((serverMessage) => {
      //console.log(getState());
      //todo
    })
    .catch((error) => {
      //todo
    });
};

/**
 * Thunk
 */
const patchTextToDBAndRefetch = () => (dispatch, getState) => {
  const state = getState();
  const sku = skuFromState(state);
  let keyValuePair = {};
  if (codigo_barrasActiveFromState(state))
    keyValuePair = { codigo_barras: codigo_barrasFromState(state) };
  if (modeloActiveFromState(state))
    keyValuePair = { modelo: modeloFromState(state) };
  if (cantidadActiveFromState(state))
    keyValuePair = { cantidad: cantidadFromState(state) };
  if (ubicacionActiveFromState(state))
    keyValuePair = { ubicacion: ubicacionFromState(state) };
  if (marcaActiveFromState(state))
    keyValuePair = { marca: marcaFromState(state) };
  if (
    precioVentaNetoActiveFromState(state) ||
    precioVentaBrutoActiveFromState(state)
  )
    keyValuePair = { precio_venta_neto: precioVentaNetoFromState(state) };
  if (descripcionActiveFromState(state))
    keyValuePair = { descripcion: descripcionFromState(state) };

  patchProduct(sku, keyValuePair)
    .then((message) => {
      if (message) {
        //todo
      }
      //fetchProductsFromDBToCache()(dispatch);
      //todo
    })
    .catch((error) => {});
};

export {
  fetchProductsFromDBToCache,
  postTextToDBAndCache,
  patchTextToDBAndRefetch,
};
