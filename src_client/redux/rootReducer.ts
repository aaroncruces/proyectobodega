import skuReducer from "./productParameters/sku/skuReducer";
import modeloReducer from "./productParameters/modelo/modeloReducer";
import codigo_barrasReducer from "./productParameters/codigo_barras/codigo_barrasReducer";
import cantidadReducer from "./productParameters/cantidad/cantidadReducer";
import ubicacionReducer from "./productParameters/ubicacion/ubicacionReducer";
import marcaReducer from "./productParameters/marca/marcaReducer";
import precio_venta_netoReducer from "./productParameters/precio_venta_neto/precio_venta_netoReducer";
import descripcionReducer from "./productParameters/descripcion/descripcionReducer";
import cachedProductListReducer from "./cachedProductList/cachedProductListReducer";
import filteredProductListReducer from "./filteredProductList/filteredProductListReducer";
import { combineReducers } from "redux";
import precio_venta_brutoReducer from "./productParameters/precio_venta_bruto/precio_venta_brutoReducer";
import connectionStatusReducer from "./connectionStatus/connectionStatusReducer";
import amountPerScanReducer from "./amountPerScan/amountPerScanReducer";

const rootReducer = combineReducers({
  skuReducer,
  modeloReducer,
  codigo_barrasReducer,
  cantidadReducer,
  ubicacionReducer,
  marcaReducer,
  precio_venta_netoReducer,
  precio_venta_brutoReducer,
  descripcionReducer,
  cachedProductListReducer,
  filteredProductListReducer,
  connectionStatusReducer,
  amountPerScanReducer,
});
export default rootReducer;
