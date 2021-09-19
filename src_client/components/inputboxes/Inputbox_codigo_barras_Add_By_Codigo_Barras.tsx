import { connect } from "react-redux";
import { onBlur } from "../../helpers/formato_codigos";
import { codigo_barrasFromState } from "../../redux/StateValueExtractor";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import Inputbox_codigo_barras from "./Inputbox_codigo_barras";

const mapStateToProps = (state, ownprops: Props_inputbox): Props_inputbox => ({
  cssClassContainer: ownprops.cssClassContainer + " dark",
});

const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  execOnKeyDown: (event: React.KeyboardEvent<any>) =>
    onKeyDown(event, dispatch),
  execOnInput: (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(thunkOnInput(event)),
});
const onKeyDown = (event: React.KeyboardEvent<any>, dispatch) => {
  console.log(event.key);
};

//need access to codigo_barras from State
const thunkOnInput =
  (event: React.ChangeEvent<HTMLInputElement>) => (dispatch, getState) => {
    const state = getState();
    const codigo_barras = onBlur(codigo_barrasFromState(state));

    //console.log(codigo_barras);
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputbox_codigo_barras);
