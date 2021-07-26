import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import { setMarca } from "../redux/marca/marcaActionCreators";
import StateModelo from "../redux/modelo/type_state_modelo";
import Producto from "../../src_servidor/tipos/Producto";
import StateListaProductos from "../redux/listaProductos/type_state_listaProductos";
import {
  listaProductosFromState,
  marcaFromState,
} from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: marcaFromState(state),
  name: "marca",
  labelBody: "Marca",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    listaProductosFromState(state) == undefined
      ? () => ""
      : marcaAndModeloRepeated_ListFetched(state),
});
const marcaAndModeloRepeated_ListFetched = (state) => (text: string) => {
  const productoEncontrado: Producto = listaProductosFromState(state).find(
    (producto) =>
      producto.marca == text &&
      producto.modelo == (state.modeloReducer as StateModelo).modelo
  );
  return productoEncontrado
    ? `El producto con modelo ${productoEncontrado.modelo} ya tiene esta marca.`
    : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (marca) => dispatch(setMarca(marca)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
