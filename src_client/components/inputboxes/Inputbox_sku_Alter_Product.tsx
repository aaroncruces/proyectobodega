import { connect } from "react-redux";
import Inputbox_sku from "./Inputbox_sku";
import Props_inputbox from "../prop_types/type_props_Inputbox";

const mapStateToProps = (state): Props_inputbox => ({
  disabled: true,
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_sku);
