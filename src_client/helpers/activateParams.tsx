import { activateCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import { activateCodigo_barras } from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import { activateDescripcion } from "../redux/productParameters/descripcion/descripcionActionCreators";
import { activatePrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import { activateMarca } from "../redux/productParameters/marca/marcaActionCreators";
import { activateModelo } from "../redux/productParameters/modelo/modeloActionCreators";
import { activateSku } from "../redux/productParameters/sku/skuActionCreators";
import { activateUbicacion } from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import { activatePrecio_venta_bruto } from "../redux/productParameters/precio_venta_bruto/precio_venta_brutoActionCreators";

export const activateParams = (dispatcher: (any: any) => any) => {
  dispatcher(activateSku());
  dispatcher(activateCodigo_barras());
  dispatcher(activateModelo());
  dispatcher(activateCantidad());
  dispatcher(activateUbicacion());
  dispatcher(activatePrecio_venta_neto());
  dispatcher(activatePrecio_venta_bruto());
  dispatcher(activateMarca());
  dispatcher(activateDescripcion());
};
