import { connect } from "react-redux";
import Inputbox_sku from "./Inputbox_sku";
import Props_inputbox from "../helpers/type_props_Inputbox";
import Producto from "../../src_server/types/Product";
import { cachedProductListFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  invalidComparator:
    cachedProductListFromState(state) == undefined
      ? skuInvalid_ListNotFetched
      : skuInvalidOrRepeated_ListFetched(state),
});
const SKU_EMPTY_MESSAGE = "SKU es obligatorio";

const skuInvalid_ListNotFetched = (text: string) =>
  text == "" ? SKU_EMPTY_MESSAGE : "";

const skuInvalidOrRepeated_ListFetched = (state) => (text: string) => {
  if (text == "") return SKU_EMPTY_MESSAGE;

  const productoEncontrado: Producto = cachedProductListFromState(state).find(
    (producto) => producto.sku == text
  );

  return productoEncontrado
    ? `El producto ya existe. ${productoEncontrado.modelo} ${productoEncontrado.marca}`
    : "";
};

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_sku);
