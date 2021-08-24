import { connect } from "react-redux";
import type_Props_Button_Link_Router from "../helpers/type_Props_Button_Link_Router";
import Button_Link_Router from "./Button_Link_Router";
import {
  skuFromState,
  codigo_barrasFromState,
  modeloFromState,
  descripcionFromState,
  ubicacionFromState,
  marcaFromState,
  precioVentaNetoFromState,
  cantidadFromState,
  skuActiveFromState,
} from "../redux/StateValueExtractor";
import { resetStoreParamsAndFilteredList } from "../helpers/resetStoreParamsAndFilteredList";
import { useHistory } from "react-router-dom";

const mapStateToProps = (state): type_Props_Button_Link_Router => ({
  cssClass: "btn-primary",
  label: "Modificar Producto",
  url: "/alterar_parametros_producto",
  invalid: !productSelected(state),
});

const productSelected = (state): boolean =>
  skuFromState(state) != "" && !skuActiveFromState(state);

const mapDispatchToProps = (
  dispatch: (any) => any
): type_Props_Button_Link_Router => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button_Link_Router);
