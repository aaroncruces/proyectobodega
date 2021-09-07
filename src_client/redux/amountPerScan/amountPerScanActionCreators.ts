import AmountPerScanActionTypes from "./amountPerScanActionTypes";
import Action from "../type_action";

const setAmountPerScan = (payload: number): Action => ({
  type: AmountPerScanActionTypes.SET_AMOUNT_PER_SCAN,
  payload,
});

export { setAmountPerScan };
