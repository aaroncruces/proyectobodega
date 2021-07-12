import ListaProductosActionTypes from "./listaProductosActionTypes";
import Action from "../type_action";
import Producto from "../../../src_servidor/tipos/Producto";
import { fetchProductos, postProducto } from "../../helpers/server";
import StateSku from "../sku/type_state_sku";
import StateCodigo_barras from "../codigo_barras/type_state_codigo_barras";
import StateModelo from "../modelo/type_state_modelo";
import StateCantidad from "../cantidad/type_state_cantidad";
import StateUbicacion from "../ubicacion/type_state_ubicacion";
import StateMarca from "../marca/type_state_marca";
import StatePrecio_venta_neto from "../precio_venta_neto/type_state_precio_venta_neto";
import StateDescripcion from "../descripcion/type_state_descripcion";
import { setSku } from "../../redux/sku/skuActionCreators";
import { setCodigo_barras } from "../../redux/codigo_barras/codigo_barrasActionCreators";
import { setModelo } from "../../redux/modelo/modeloActionCreators";
import { setCantidad } from "../../redux/cantidad/cantidadActionCreators";
import { setUbicacion } from "../../redux/ubicacion/ubicacionActionCreators";
import { setMarca } from "../../redux/marca/marcaActionCreators";
import { setPrecio_venta_neto } from "../../redux/precio_venta_neto/precio_venta_netoActionCreators";
import { setDescripcion } from "../../redux/descripcion/descripcionActionCreators";

const setListaProductos = (payload: Producto[]): Action => ({
  type: ListaProductosActionTypes.SET_LISTA_PRODUCTOS,
  payload,
});
const pushProducto = (payload: Producto): Action => ({
  type: ListaProductosActionTypes.PUSH_PRODUCTO,
  payload,
});

/**
 * Thunk
 */
const fetchListaProductos = () => (dispatch) => {
  fetchProductos()
    .then((productos) => {
      dispatch(setListaProductos(productos));
    })
    .catch((error) => {
      setListaProductos(undefined);
    });
};

/**
 * Thunk
 */
const postTextToProductoDB = () => (dispatch, getState) => {
  const state = getState();
  const producto: Producto = {
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
  dispatch(pushProducto(producto));

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
export { fetchListaProductos, postTextToProductoDB };
