import { connect } from "react-redux";
import { onInput, onBlur } from "../../helpers/formato_descripciones";
import {
  cachedProductListFromState,
  modeloActiveFromState,
  modeloFromState,
} from "../../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../prop_types/type_props_Datalist";
import {
  deactivateModelo,
  setModelo,
} from "../../redux/productParameters/modelo/modeloActionCreators";
import ParameterName from "../../redux/productParameters/enum_ParameterName";

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
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (modelo: string) => dispatch(setModelo(modelo)),
  deactivateCurrentDatalist: () => dispatch(deactivateModelo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
