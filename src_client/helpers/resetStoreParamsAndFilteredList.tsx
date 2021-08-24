import { setCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import { setCodigo_barras } from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import { setDescripcion } from "../redux/productParameters/descripcion/descripcionActionCreators";
import { setPrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import { setMarca } from "../redux/productParameters/marca/marcaActionCreators";
import { setModelo } from "../redux/productParameters/modelo/modeloActionCreators";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import { setUbicacion } from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import { reloadFilteredProductListFromCache } from "../redux/filteredProductList/filteredProductListActionCreators";
import { activateParams } from "./activateParams";

export const resetStoreParamsAndFilteredList = (
  dispatcher: (any) => any
): void => {
  resetParams(dispatcher);
  activateParams(dispatcher);
  dispatcher(reloadFilteredProductListFromCache());
};
const resetParams = (dispatcher: (any: any) => any) => {
  dispatcher(setSku(""));
  dispatcher(setCodigo_barras(""));
  dispatcher(setModelo(""));
  dispatcher(setCantidad(0));
  dispatcher(setUbicacion(""));
  dispatcher(setMarca(""));
  dispatcher(setPrecio_venta_neto(0));
  dispatcher(setDescripcion(""));
};
