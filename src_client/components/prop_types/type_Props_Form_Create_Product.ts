import Product from "../../../src_server/types/Product";

type Props_Form_Create_Product = {
  productListDB?: Product[];
  fetchProductList?: () => any;
  resetParamsAndFilteredLists?: () => any;
};
export default Props_Form_Create_Product;
