import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import StateSku from "../redux/sku/type_state_sku";
import { setSku } from "../redux/sku/skuActionCreators";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";

const mapStateToProps = (state): Props_Datalist => ({
  textDatalist: (state.skuReducer as StateSku).sku,
  name: "sku",
  labelBody: "SKU",
  format_onBlur: onBlur,
  format_onInput: onInput,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateStoreValueReducer: (sku: string) => dispatch(setSku(sku)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
