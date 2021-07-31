import Product from "../../src_server/types/Product";
import StateCantidad from "./productParameters/cantidad/type_state_cantidad";
import StateCodigo_barras from "./productParameters/codigo_barras/type_state_codigo_barras";
import StateDescripcion from "./productParameters/descripcion/type_state_descripcion";
import StateCachedProductList from "./cachedProductList/type_StateCachedProductList";
import StateMarca from "./productParameters/marca/type_state_marca";
import StateModelo from "./productParameters/modelo/type_state_modelo";
import StatePrecio_venta_neto from "./productParameters/precio_venta_neto/type_state_precio_venta_neto";
import StateSku from "./productParameters/sku/type_state_sku";
import StateUbicacion from "./productParameters/ubicacion/type_state_ubicacion";
import ActiveParameterName from "./productParameters/activeParameter/enum_ActiveParameterName";
import StateActiveParameter from "./productParameters/activeParameter/type_StateStateActiveParameter";

const cachedProductListFromState = (state): Product[] =>
  (state.cachedProductListReducer as StateCachedProductList).cachedProductList;
const skuFromState = (state): string => (state.skuReducer as StateSku).sku;
const codigo_barrasFromState = (state): string =>
  (state.codigo_barrasReducer as StateCodigo_barras).codigo_barras;
const modeloFromState = (state): string =>
  (state.modeloReducer as StateModelo).modelo;
const cantidadFromState = (state): number =>
  (state.cantidadReducer as StateCantidad).cantidad;
const ubicacionFromState = (state): string =>
  (state.ubicacionReducer as StateUbicacion).ubicacion;
const marcaFromState = (state): string =>
  (state.marcaReducer as StateMarca).marca;
const precioVentaNetoFromState = (state): number =>
  (state.precio_venta_netoReducer as StatePrecio_venta_neto).precio_venta_neto;
const descripcionFromState = (state): string =>
  (state.descripcionReducer as StateDescripcion).descripcion;
const activeParameterFromState = (state): ActiveParameterName =>
  (state.activeParameterReducer as StateActiveParameter).activeParameter;
export {
  cachedProductListFromState,
  skuFromState,
  codigo_barrasFromState,
  modeloFromState,
  cantidadFromState,
  ubicacionFromState,
  marcaFromState,
  precioVentaNetoFromState,
  descripcionFromState,
  activeParameterFromState,
};
