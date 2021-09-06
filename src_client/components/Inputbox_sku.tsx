import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "./prop_types/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import { skuFromState } from "../redux/StateValueExtractor";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: skuFromState(state),
  name: "sku",
  labelBody: "SKU",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
