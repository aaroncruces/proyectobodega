import Product from "../../src_server/types/Product";

type Props_Form_Search_Product = {
  reFetchProductListToCache?: () => any;
  cachedProductList?: Product[];
  resetParamsAndFilteredLists?: () => any;
};
export default Props_Form_Search_Product;
