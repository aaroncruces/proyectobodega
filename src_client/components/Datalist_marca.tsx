import { connect } from "react-redux";
import { onInput, onBlur } from "../helpers/formato_descripciones";
import {
  cachedProductListFromState,
  marcaActiveFromState,
  marcaFromState,
} from "../redux/StateValueExtractor";
import Datalist from "./Datalist";
import Props_Datalist from "../helpers/type_props_Datalist";
import { setMarca } from "../redux/productParameters/marca/marcaActionCreators";
import ParameterName from "../redux/productParameters/enum_ParameterName";

const mapStateToProps = (state): Props_Datalist => ({
  textCurrentParam: marcaFromState(state),
  name: "marca",
  labelBody: "Marca",
  paramName: ParameterName.MARCA,
  format_onBlur: onBlur,
  format_onInput: onInput,
  enabled: marcaActiveFromState(state) && !!cachedProductListFromState(state),
  defaultPlaceholder: !cachedProductListFromState(state)
    ? "Cargando..."
    : "Buscar por Marca",
});

const mapDispatchToProps = (dispatch: (any) => any): Props_Datalist => ({
  updateParameterStoreReducer: (marca: string) => dispatch(setMarca(marca)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Datalist);
