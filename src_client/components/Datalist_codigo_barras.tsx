import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_codigos";
import { setCodigo_barras } from "../redux/productParameters/codigo_barras/codigo_barrasActionCreators";
import {
  cachedProductListFromState,
  codigo_barrasActiveFromState,
  codigo_barrasFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";

import {
  commonDispatchers,
  commonStateProps,
} from "../helpers/datalist_commons";
import ParameterName from "../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: codigo_barrasFromState(state),
  name: "codigo_barras",
  labelBody: "Codigo de barras",
  paramName: ParameterName.CODIGO_BARRAS,
  format_onInput: onInput,
  format_onBlur: onBlur,
  enabled:
    codigo_barrasActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por Codigo de barras",
  ...commonStateProps(state, ParameterName.CODIGO_BARRAS),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (codigo_barras: string) =>
    dispatch(setCodigo_barras(codigo_barras)),
  ...commonDispatchers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
