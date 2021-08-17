import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import {
  cachedProductListFromState,
  skuActiveFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import ParameterName from "../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  paramName: ParameterName.SKU,
  format_onInput: onInput,
  format_onBlur: onBlur,
  enabled: skuActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por SKU",
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
