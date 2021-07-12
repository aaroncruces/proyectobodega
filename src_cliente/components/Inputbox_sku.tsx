import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../helpers/type_props_Inputbox";
import { onInput, onBlur } from "../helpers/formato_codigos";
import StateSku from "../redux/sku/type_state_sku";

import { setSku } from "../redux/sku/skuActionCreators";

class Inputbox_sku extends Inputbox<Props_inputbox> {
  name = "sku";
  labelBody = "SKU";
  format_onBlur = onBlur;
  format_onInput = onInput;
}
const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.skuReducer as StateSku).sku,
});
const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_sku);