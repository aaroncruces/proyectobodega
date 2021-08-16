import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import {
  cachedProductListFromState,
  ubicacionActiveFromState,
  ubicacionFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import { setUbicacion } from "../redux/productParameters/ubicacion/ubicacionActionCreators";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import {
  commonDispatchers,
  commonStateProps,
} from "../helpers/datalist_commons";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: ubicacionFromState(state),
  name: "ubicacion",
  labelBody: "Ubicacion",
  paramName: ParameterName.UBICACION,
  format_onBlur: onBlur,
  format_onInput: onInput,
  enabled:
    ubicacionActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por Ubicacion",
  ...commonStateProps(state, ParameterName.UBICACION),
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (ubicacion: string) =>
    dispatch(setUbicacion(ubicacion)),
  ...commonDispatchers(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
