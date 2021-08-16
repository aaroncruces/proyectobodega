import { connect } from "react-redux";
import Props_Button from "../helpers/type_props_button";
import Button from "./Button";
import { postTextToDBAndCache } from "../redux/cachedProductList/cachedProductListActionCreators";
import {
  skuFromState,
  codigo_barrasFromState,
  modeloFromState,
  descripcionFromState,
  ubicacionFromState,
  marcaFromState,
  precioVentaNetoFromState,
  cantidadFromState,
} from "../redux/StateValueExtractor";
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

const mapStateToProps = (state): Props_Button => ({
  label: "Borrar Formulario",
  cssClass: "btn btn-primary",
  invalid: areProductParametersEmpty(state),
});

const areProductParametersEmpty = (state): boolean =>
  skuFromState(state) == "" &&
  codigo_barrasFromState(state) == "" &&
  modeloFromState(state) == "" &&
  descripcionFromState(state) == "" &&
  ubicacionFromState(state) == "" &&
  marcaFromState(state) == "" &&
  precioVentaNetoFromState(state) == 0 &&
  cantidadFromState(state) == 0;

const mapDispatchToProps = (dispatch: (any) => any): Props_Button => ({
  onClick: () => resetStore(dispatch),
});

const resetStore = (dispatcher: (any) => any): void => {
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
export default connect(mapStateToProps, mapDispatchToProps)(Button);
