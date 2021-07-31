import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setSku } from "../redux/productParameters/sku/skuActionCreators";
import Product from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  modeloFromState,
  skuActiveFromState,
  skuFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import { setModelo } from "../redux/productParameters/modelo/modeloActionCreators";

const mapStateToProps = (state): Props_Datalist => ({
  textDatalist: modeloFromState(state),
  name: "modelo",
  labelBody: "Modelo",
  format_onBlur: onBlur,
  format_onInput: onInput,
  invalidComparator: (txt) => "",
  listOfData:
    cachedProductListFromState(state) == undefined
      ? []
      : cachedProductListFromState(state).map(
          (producto: Product) => producto.modelo
        ),
  enabled: skuActiveFromState(state),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (modelo: string) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
