import cachedProductListActionTypes from "./cachedProductListActionTypes";
import Action from "../type_action";
import Product from "../../../src_server/types/Product";
import { fetchProductos, postProducto } from "../../helpers/server";
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
    sku: (state.skuReducer as StateSku).sku,
    codigo_barras: (state.codigo_barrasReducer as StateCodigo_barras)
      .codigo_barras,
    modelo: (state.modeloReducer as StateModelo).modelo,
    cantidad: (state.cantidadReducer as StateCantidad).cantidad,
    ubicacion: (state.ubicacionReducer as StateUbicacion).ubicacion,
    marca: (state.marcaReducer as StateMarca).marca,
    precio_venta_neto: (
      state.precio_venta_netoReducer as StatePrecio_venta_neto
    ).precio_venta_neto,
    descripcion: (state.descripcionReducer as StateDescripcion).descripcion,
  };
  dispatch(pushProductToCache(producto));

  dispatch(setSku(""));
  dispatch(setCodigo_barras(""));
  dispatch(setModelo(""));
  dispatch(setCantidad(0));
  dispatch(setUbicacion(""));
  dispatch(setMarca(""));
  dispatch(setPrecio_venta_neto(0));
  dispatch(setDescripcion(""));

  postProducto(producto)
    .then((mensajeServer) => {
      if (mensajeServer.exito) {
        //todo
      }
      console.log(getState());
      //todo
    })
    .catch((error) => {
      //todo
    });
};
export { fetchProductsFromDBToCache, postTextToDBAndCache };
