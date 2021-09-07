import { connect } from "react-redux";
import Inputbox from "./Inputbox";
import Props_inputbox from "../prop_types/type_props_Inputbox";
import { amountPerScanFromState } from "../../redux/StateValueExtractor";
import { setAmountPerScan } from "../../redux/amountPerScan/amountPerScanActionCreators";

const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: amountPerScanFromState(state),
  name: "cantidad_por_escaneo",
  labelBody: "Cantidad por escaneo",
  type: "number",
  format_onBlur: onlyPositiveIntegers,
  format_onInput: onlyPositiveIntegers,
});
const onlyPositiveIntegers = (value) => {
  if (value < 1) return 1;
  return Math.trunc(value);
};
//format_onBlur -> N>=1
const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValueReducer: (amountPerScan: number) =>
    dispatch(setAmountPerScan(amountPerScan)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Inputbox);
