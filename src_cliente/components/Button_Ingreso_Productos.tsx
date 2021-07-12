import { connect } from "react-redux";
import Props_Button from "../helpers/type_props_button";
import Button from "./Button";
import StatelistaProductos from "../redux/listaProductos/type_state_listaProductos";
import StateSku from "../redux/sku/type_state_sku";
import StateModelo from "../redux/modelo/type_state_modelo";
import StateCodigo_barras from "../redux/codigo_barras/type_state_codigo_barras";
import StateMarca from "../redux/marca/type_state_marca";

const mapStateToProps = (state): Props_Button => ({
  label: checkStateForLabel(state),
  cssClass: checkStateForCSS(state),
  invalid: checkStateInvalid(state),
});

//todo thunk: guardar producto,then agregarlo a redux, catch deletear y recargar+error message
const mapDispatchToProps = {};

const checkStateForLabel = (state: any): string => {
  if (listIncorrectInputs(state).size > 0) return "Revise Inputboxes";
  if (!(state.listaProductosReducer as StatelistaProductos).listaProductos)
    return "Cargando productos";
  return "Ingreso Productos";
};

const checkStateForCSS = (state: any): string =>
  listIncorrectInputs(state).size > 0 ? "btn btn-danger" : "btn btn-primary";

const checkStateInvalid = (state: any): boolean =>
  !(state.listaProductosReducer as StatelistaProductos).listaProductos ||
  listIncorrectInputs(state).size > 0;

/**
 * todo: tooltips
 * @param state 1
 * @returns
 */
const listIncorrectInputs = (state: any): Set<string> => {
  let incorrectParameters = new Set<string>();
  const sku = (state.skuReducer as StateSku).sku;
  const SKU = "SKU";
  const modelo = (state.modeloReducer as StateModelo).modelo;
  const MODELO = "Nombre";

  //check empties
  if (sku == "") incorrectParameters.add(SKU);
  if (modelo == "") incorrectParameters.add(MODELO);

  const listaProductos = (state.listaProductosReducer as StatelistaProductos)
    .listaProductos;
  //db not loaded yet
  if (!listaProductos) return incorrectParameters;

  const productoSKURepeated = listaProductos.find(
    (producto) => producto.sku == sku
  );
  if (productoSKURepeated) incorrectParameters.add(SKU);

  const codigo_barras = (state.codigo_barrasReducer as StateCodigo_barras)
    .codigo_barras;
  const productoCodigoBarrasRepeated = listaProductos.find(
    (producto) => producto.codigo_barras == codigo_barras
  );
  const CODIGO_BARRAS = "Codigo de barras";
  if (productoCodigoBarrasRepeated) incorrectParameters.add(CODIGO_BARRAS);

  const marca = (state.marcaReducer as StateMarca).marca;
  const productoModeloMarcaCoincident = listaProductos.find(
    (producto) => producto.marca == marca && producto.modelo == modelo
  );
  const MARCA = "Marca";
  if (productoModeloMarcaCoincident) incorrectParameters.add(MODELO).add(MARCA);

  return incorrectParameters;
};

//no es necesaria la inheritance. a ver si arreglo asi los inputboxes (quiza, no se)
export default connect(mapStateToProps, mapDispatchToProps)(Button);
