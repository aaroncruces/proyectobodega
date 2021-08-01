import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import Product from "../../src_server/types/Product";
import {
  cachedProductListFromState,
  filteredProductListFromState,
  modeloActiveFromState,
  modeloFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import { setModelo } from "../redux/productParameters/modelo/modeloActionCreators";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: modeloFromState(state),
  name: "modelo",
  labelBody: "Modelo",
  format_onBlur: onBlur,
  format_onInput: onInput,
  enabled: modeloActiveFromState(state),
  listOfData:
    cachedProductListFromState(state) && !filteredProductListFromState(state)
      ? cachedProductListFromState(state).map(
          (product: Product) => product.modelo
        )
      : filteredProductListFromState(state)
      ? filteredProductListFromState(state).map(
          (product: Product) => product.modelo
        )
      : ["Cargando..."],
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (modelo: string) => dispatch(setModelo(modelo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
