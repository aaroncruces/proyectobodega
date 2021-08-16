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
import {
  commonDispatchers,
  commonStateProps,
} from "../helpers/datalist_commons";
import ParameterName from "../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: modeloFromState(state),
  name: "modelo",
  labelBody: "Modelo",
  paramName: ParameterName.MODELO,
  format_onBlur: onBlur,
  format_onInput: onInput,
  enabled: modeloActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por Modelo",
  ...commonStateProps(state, ParameterName.MODELO),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (modelo: string) => dispatch(setModelo(modelo)),
  ...commonDispatchers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);