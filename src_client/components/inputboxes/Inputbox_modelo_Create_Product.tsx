import { connect } from "react-redux";
import Inputbox_modelo from "./Inputbox_modelo";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import StateMarca from "../../redux/productParameters/marca/type_state_marca";
import Producto from "../../../src_server/types/Product";
import { cachedProductListFromState } from "../../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
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

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_modelo);
