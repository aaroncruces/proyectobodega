import Action from "../../type_action";
import ActiveParameterActionsTypes from "./activeParameterListActionTypes";
import ActiveParameterName from "./enum_ActiveParameterName";
import StateActiveParameterList from "./type_StateStateActiveParameterList";

const initialState: StateActiveParameterList = {
  activeParameterList: [
    ActiveParameterName.SKU,
    ActiveParameterName.CODIGO_BARRAS,
    ActiveParameterName.MODELO,
    ActiveParameterName.MARCA,
    ActiveParameterName.CANTIDAD,
    ActiveParameterName.DESCRIPCION,
    ActiveParameterName.PRECIO_VENTA_NETO,
    ActiveParameterName.UBICACION,
  ],
};
const activeParameterListReducer = (
  state: StateActiveParameterList = initialState,
  action: Action
): StateActiveParameterList =>
  action.type == ActiveParameterActionsTypes.SET_ACTIVE_PARAMETER_LIST
    ? { ...state, activeParameterList: action.payload }
    : { ...state };
export default activeParameterListReducer;
