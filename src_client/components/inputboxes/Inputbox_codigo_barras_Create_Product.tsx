import { connect } from "react-redux";
import Inputbox_codigo_barras from "./Inputbox_codigo_barras";
import Props_inputbox from "./prop_types/type_props_Inputbox";
import { cachedProductListFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? () => ""
      : codigoBarrasRepeated_ListFetched(state),
});

const CODIGO_BARRAS_REPEATED_MESSAGE = "Ya existe un producto con este codigo";
const codigoBarrasRepeated_ListFetched = (state) => (text: string) =>
  cachedProductListFromState(state).find(
    (producto) => text != "" && producto.codigo_barras == text
  )
    ? CODIGO_BARRAS_REPEATED_MESSAGE
    : "";

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_codigo_barras);
