import cachedProductListActionTypes from "./cachedProductListActionTypes";
import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import {
  fetchProductos,
  patchProduct,
  postProducto,
} from "../../helpers/server";
import StateSku from "../productParameters/sku/type_state_sku";
import StateCodigo_barras from "../productParameters/codigo_barras/type_state_codigo_barras";
import StateModelo from "../productParameters/modelo/type_state_modelo";
import StateCantidad from "../productParameters/cantidad/type_state_cantidad";
import StateUbicacion from "../productParameters/ubicacion/type_state_ubicacion";
import StateMarca from "../productParameters/marca/type_state_marca";
import StatePrecio_venta_neto from "../productParameters/precio_venta_neto/type_state_precio_venta_neto";
import StateDescripcion from "../productParameters/descripcion/type_state_descripcion";
import { setSku } from "../../redux/productParameters/sku/skuActionCreators";
import { setCodigo_barras } from "../../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import { setModelo } from "../../redux/productParameters/modelo/modeloActionCreators";
import { setCantidad } from "../../redux/productParameters/cantidad/cantidadActionCreators";
import { setUbicacion } from "../../redux/productParameters/ubicacion/ubicacionActionCreators";
import { setMarca } from "../../redux/productParameters/marca/marcaActionCreators";
import { setPrecio_venta_neto } from "../../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import { setDescripcion } from "../../redux/productParameters/descripcion/descripcionActionCreators";
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
const postTextToDBAndCache = () => (dispatch, getState) => {
  const state = getState();
  const producto: Product = {
    sku: skuFromState(state),
    codigo_barras: codigo_barrasFromState(state),
    modelo: modeloFromState(state),
    cantidad: cantidadFromState(state),
    ubicacion: ubicacionFromState(state),
    marca: marcaFromState(state),
    precio_venta_neto: precioVentaNetoFromState(state),
    descripcion: descripcionFromState(state),
  };
  dispatch(pushProductToCache(producto));
  resetParams(dispatch);

  postProducto(producto)
    .then((mensajeServer) => {
      if (mensajeServer.exito) {
        //todo
      }
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
