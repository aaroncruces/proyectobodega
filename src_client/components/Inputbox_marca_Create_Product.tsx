import { connect } from "react-redux";
import Inputbox_marca from "./Inputbox_marca";
import Props_inputbox from "../helpers/type_props_Inputbox";
import StateModelo from "../redux/productParameters/modelo/type_state_modelo";
import Product from "../../src_server/types/Product";
import { cachedProductListFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? () => ""
      : marcaAndModeloRepeated_ListFetched(state),
});
const marcaAndModeloRepeated_ListFetched = (state) => (text: string) => {
  const productoEncontrado: Product = cachedProductListFromState(state).find(
    (producto) =>
      producto.marca == text &&
      producto.modelo == (state.modeloReducer as StateModelo).modelo
  );
  return productoEncontrado
    ? `El producto con modelo ${productoEncontrado.modelo} ya tiene esta marca.`
    : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_marca);
