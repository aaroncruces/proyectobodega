import { deactivateCantidad } from "../redux/productParameters/cantidad/cantidadActionCreators";
import { deactivateCodigo_barras } from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import { deactivateDescripcion } from "../redux/productParameters/descripcion/descripcionActionCreators";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import { deactivateMarca } from "../redux/productParameters/marca/marcaActionCreators";
import { deactivateModelo } from "../redux/productParameters/modelo/modeloActionCreators";
import { deactivatePrecio_venta_bruto } from "../redux/productParameters/precio_venta_bruto/precio_venta_brutoActionCreators";
import { deactivatePrecio_venta_neto } from "../redux/productParameters/precio_venta_neto/precio_venta_netoActionCreators";
import { deactivateUbicacion } from "../redux/productParameters/ubicacion/ubicacionActionCreators";

export const disableInputboxesExcept = (
  paramName: ParameterName,
  dispatcher: (any) => any
) => {
  paramName != ParameterName.CODIGO_BARRAS &&
    dispatcher(deactivateCodigo_barras());
  paramName != ParameterName.MODELO && dispatcher(deactivateModelo());
  paramName != ParameterName.CANTIDAD && dispatcher(deactivateCantidad());
  paramName != ParameterName.UBICACION && dispatcher(deactivateUbicacion());
  paramName != ParameterName.MARCA && dispatcher(deactivateMarca());
  paramName != ParameterName.PRECIO_VENTA_NETO &&
    dispatcher(deactivatePrecio_venta_neto());
  paramName != ParameterName.PRECIO_VENTA_BRUTO &&
    dispatcher(deactivatePrecio_venta_bruto());
  paramName != ParameterName.DESCRIPCION && dispatcher(deactivateDescripcion());
};
