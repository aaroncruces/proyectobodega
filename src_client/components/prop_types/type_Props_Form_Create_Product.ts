import Product from "../../src_server/types/Product";
import ConnectionStatusTypes from "../redux/connectionStatus/enumConnectionStatusTypes";

type Props_Form_Create_Product = {
  productListDB?: Product[];
  conectionStatus?: ConnectionStatusTypes;
  connectionMessage?: string;
  fetchProductList?: () => any;
  resetParamsAndFilteredLists?: () => any;
  resetConnectionStatus?: () => any;
};
export default Props_Form_Create_Product;
