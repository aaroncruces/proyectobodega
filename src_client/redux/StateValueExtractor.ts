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
import StateFilteredProductList from "./filteredProductList/type_StateFilteredProductList";

const skuFromState = (state): string => (state.skuReducer as StateSku).sku;
const skuActiveFromState = (state): boolean =>
  (state.skuReducer as StateSku).sku_parameterActive;
const codigo_barrasFromState = (state): string =>
  (state.codigo_barrasReducer as StateCodigo_barras).codigo_barras;
const modeloFromState = (state): string =>
  (state.modeloReducer as StateModelo).modelo;
const modeloActiveFromState = (state): boolean =>
  (state.modeloReducer as StateModelo).modelo_parameterActive;
const cantidadFromState = (state): number =>
  (state.cantidadReducer as StateCantidad).cantidad;
const ubicacionFromState = (state): string =>
  (state.ubicacionReducer as StateUbicacion).ubicacion;
const marcaFromState = (state): string =>
  (state.marcaReducer as StateMarca).marca;
const marcaActiveFromState = (state): boolean =>
  (state.marcaReducer as StateMarca).marca_parameterActive;
const precioVentaNetoFromState = (state): number =>
  (state.precio_venta_netoReducer as StatePrecio_venta_neto).precio_venta_neto;
const descripcionFromState = (state): string =>
  (state.descripcionReducer as StateDescripcion).descripcion;
const cachedProductListFromState = (state): Product[] =>
  (state.cachedProductListReducer as StateCachedProductList).cachedProductList;
const filteredProductListFromState = (state): Product[] =>
  (state.filteredProductListReducer as StateFilteredProductList)
    .filteredProductList;
export {
  cachedProductListFromState,
  filteredProductListFromState,
  skuFromState,
  skuActiveFromState,
  codigo_barrasFromState,
  modeloFromState,
  modeloActiveFromState,
  cantidadFromState,
  ubicacionFromState,
  marcaFromState,
  marcaActiveFromState,
  precioVentaNetoFromState,
  descripcionFromState,
};
