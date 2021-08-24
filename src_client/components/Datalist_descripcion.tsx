import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import {
  cachedProductListFromState,
  descripcionActiveFromState,
  descripcionFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import ParameterName from "../redux/productParameters/enum_ParameterName";
import {
  deactivateDescripcion,
  setDescripcion,
} from "../redux/productParameters/descripcion/descripcionActionCreators";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: descripcionFromState(state),
  name: "descripcion",
  labelBody: "Descripcion",
  paramName: ParameterName.DESCRIPCION,
  format_onBlur: onBlur,
  format_onInput: onInput,
  enabled:
    descripcionActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por Descripcion",
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (descripcion: string) =>
    dispatch(setDescripcion(descripcion)),
  deactivateCurrentDatalist: () => dispatch(deactivateDescripcion()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
