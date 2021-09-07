import Action from "../type_action";
import AmountPerScanActionsTypes from "./amountPerScanActionTypes";
import StateAmountPerScan from "./type_StateAmountPerScan";

const initialState: StateAmountPerScan = {
  amountPerScan: 1,
};
const amountPerScanReducer = (
  state: StateAmountPerScan = initialState,
  action: Action
): StateAmountPerScan =>
  action.type == AmountPerScanActionsTypes.SET_AMOUNT_PER_SCAN
    ? { ...state, amountPerScan: action.payload }
    : { ...state };
export default amountPerScanReducer;
