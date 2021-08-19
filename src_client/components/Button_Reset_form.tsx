import { connect } from "react-redux";
import Props_Button from "../helpers/type_props_button";
import Button from "./Button";
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
import { resetStoreParamsAndFilteredList } from "../helpers/resetStoreParamsAndFilteredList";

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
  onClick: () => resetStoreParamsAndFilteredList(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
