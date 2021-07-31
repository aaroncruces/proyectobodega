import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import { setModelo } from "../redux/productParameters/modelo/modeloActionCreators";
import StateMarca from "../redux/productParameters/marca/type_state_marca";
import Producto from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  modeloFromState,
} from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: modeloFromState(state),
  name: "modelo",
  labelBody: "Nombre o Modelo",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? modeloInvalid_ListNotFetched
      : modeloInvalidOrMarcaRepeated_ListFetched(state),
});

const MODELO_EMPTY_MESSAGE = "Nombre del producto es obligatorio";

const modeloInvalid_ListNotFetched = (text: string) =>
  text == "" ? MODELO_EMPTY_MESSAGE : "";

const modeloInvalidOrMarcaRepeated_ListFetched = (state) => (text: string) => {
  if (text == "") return MODELO_EMPTY_MESSAGE;

  const productoEncontrado: Producto = cachedProductListFromState(state).find(
    (producto) =>
      producto.modelo == text &&
      producto.marca == (state.marcaReducer as StateMarca).marca
  );
  return productoEncontrado
    ? `El producto con marca ${productoEncontrado.marca} ya tiene este modelo.`
    : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (modelo) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
