import { connect } from "react-redux";
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
  cachedProductListFromState,
} from "../redux/StateValueExtractor";
import { resetStoreParamsAndFilteredList } from "../helpers/resetStoreParamsAndFilteredList";
import { useHistory } from "react-router-dom";
import Button from "./Button";
import Props_Button from "./prop_types/type_props_button";

const mapStateToProps = (state): Props_Button => ({
  cssClass: "btn-primary",
  label: "Modificar Producto",
  url: "/alterar_parametros_producto",
  invalid: !productSelected(state),
});

const productSelected = (state): boolean =>
  !!cachedProductListFromState(state)?.find(
    (product) => product.sku == skuFromState(state)
  );

const mapDispatchToProps = (dispatch: (any) => any): Props_Button => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
