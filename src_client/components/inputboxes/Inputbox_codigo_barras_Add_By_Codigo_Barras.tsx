import { connect } from "react-redux";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import Inputbox_codigo_barras from "./Inputbox_codigo_barras";

const mapStateToProps = (state): Props_inputbox => ({});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnKeyDown: (event: React.KeyboardEvent<any>) =>
    onKeyDown(event, dispatch),
});
const onKeyDown = (event: React.KeyboardEvent<any>, dispatch) => {
  console.log(event.key);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_codigo_barras);
