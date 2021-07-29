import { connect } from "react-redux";
import Props_Button from "../helpers/type_props_button";
import Button from "./Button";
import { postTextToProductoDB } from "../redux/cachedProductList/cachedProductListActionCreators";
import {
  codigo_barrasFromState,
  listaProductosFromState,
  marcaFromState,
  modeloFromState,
  skuFromState,
} from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_Button => ({
  label: checkStateForLabel(state),
  cssClass: checkStateForCSS(state),
  invalid: checkStateInvalid(state),
});

//todo thunk: guardar producto,then agregarlo a redux, catch deletear y recargar+error message
const mapDispatchToProps = (dispatch: (any) => any): Props_Button => ({
  //thunk
  onClick: () => dispatch(postTextToProductoDB()),
});

const checkStateForLabel = (state: any): string => {
  if (listIncorrectInputs(state).size > 0) return "Revise Inputboxes";
  if (!listaProductosFromState(state)) return "Cargando productos";
  return "Ingreso Productos";
};

const checkStateForCSS = (state: any): string =>
  listIncorrectInputs(state).size > 0 ? "btn btn-danger" : "btn btn-primary";

const checkStateInvalid = (state: any): boolean =>
  !listaProductosFromState(state) || listIncorrectInputs(state).size > 0;

const listIncorrectInputs = (state: any): Set<string> => {
  let incorrectParameters = new Set<string>();
  const sku = skuFromState(state);
  const SKU = "SKU";
  const modelo = modeloFromState(state);
  const MODELO = "Nombre";

  if (sku == "") incorrectParameters.add(SKU);
  if (modelo == "") incorrectParameters.add(MODELO);

  const listaProductos = listaProductosFromState(state);

  //db not loaded yet
  if (!listaProductos) return incorrectParameters;

  const productoSKURepeated = listaProductos.find(
    (producto) => producto.sku == sku
  );
  if (productoSKURepeated) incorrectParameters.add(SKU);

  const codigo_barras = codigo_barrasFromState(state);
  const productoCodigoBarrasRepeated = listaProductos.find(
    (producto) => codigo_barras != "" && producto.codigo_barras == codigo_barras
  );
  const CODIGO_BARRAS = "Codigo de barras";
  if (productoCodigoBarrasRepeated) incorrectParameters.add(CODIGO_BARRAS);

  const marca = marcaFromState(state);
  const productoModeloMarcaCoincident = listaProductos.find(
    (producto) => producto.marca == marca && producto.modelo == modelo
  );
  const MARCA = "Marca";
  if (productoModeloMarcaCoincident) incorrectParameters.add(MODELO).add(MARCA);

  return incorrectParameters;
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);
