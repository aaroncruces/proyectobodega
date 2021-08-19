import { setCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import {
  activateCodigo_barras,
  setCodigo_barras,
} from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import {
  activateDescripcion,
  setDescripcion,
} from "../redux/productParameters/descripcion/descripcionActionCreators";
import { setPrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import {
  activateMarca,
  setMarca,
} from "../redux/productParameters/marca/marcaActionCreators";
import {
  activateModelo,
  setModelo,
} from "../redux/productParameters/modelo/modeloActionCreators";
import {
  activateSku,
  setSku,
} from "../redux/productParameters/sku/skuActionCreators";
import {
  activateUbicacion,
  setUbicacion,
} from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import { reloadFilteredProductListFromCache } from "../redux/filteredProductList/filteredProductListActionCreators";

export const resetStoreParamsAndFilteredList = (
  dispatcher: (any) => any
): void => {
  dispatcher(setSku(""));
  dispatcher(activateSku());
  dispatcher(setCodigo_barras(""));
  dispatcher(activateCodigo_barras());
  dispatcher(setModelo(""));
  dispatcher(activateModelo());
  dispatcher(setCantidad(0));
  dispatcher(setUbicacion(""));
  dispatcher(activateUbicacion());
  dispatcher(setMarca(""));
  dispatcher(activateMarca());
  dispatcher(setPrecio_venta_neto(0));
  dispatcher(setDescripcion(""));
  dispatcher(activateDescripcion());
  dispatcher(reloadFilteredProductListFromCache());
};
