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
  /**
   * En el caso de sku existen condiciones para que sea invalido.
   * Estas condiciones dependen expicitamente del formulario (en particular del formulario de ingreso)
   */
}
/**
 *
 * @param state contiene el valor de sku, invalidSku y invalidSkuMessage
 * @returns pasa como props: textInputBox, isInvalid, invalidMessage
 */
const mapStateToProps = (state): Props_inputbox => ({
  textInputBox: (state.skuReducer as StateSku).sku,
});
/**
 * Aquí se usa una action de tipo thunk (setAndVerifySku),
 * ya que no solo se debe setear sku, sino tambien su validez
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (dispatch: (any) => any): Props_inputbox => ({
  updateStoreValue: (sku: string) => dispatch(setSku(sku)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Inputbox_sku);
