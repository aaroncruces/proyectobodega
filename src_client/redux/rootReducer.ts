import skuReducer from "./sku/skuReducer";
import modeloReducer from "./modelo/modeloReducer";
import codigo_barrasReducer from "./codigo_barras/codigo_barrasReducer";
import cantidadReducer from "./cantidad/cantidadReducer";
import ubicacionReducer from "./ubicacion/ubicacionReducer";
import marcaReducer from "./marca/marcaReducer";
import precio_venta_netoReducer from "./precio_venta_neto/precio_venta_netoReducer";
import descripcionReducer from "./descripcion/descripcionReducer";
import listaProductosReducer from "./cachedProductList/cachedProductListReducer";
import listaProductosBuscadosReducer from "./listaProductosBuscados/listaProductosBuscadosReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  skuReducer,
  modeloReducer,
  codigo_barrasReducer,
  cantidadReducer,
  ubicacionReducer,
  marcaReducer,
  precio_venta_netoReducer,
  descripcionReducer,
  listaProductosReducer,
  listaProductosBuscadosReducer,
});
export default rootReducer;
