import Product from "../../src_server/types/Product";

type Props_Form_Modify_Product = {
  reFetchProductListToCache?: () => any;
  cachedProductList?: Product[];
};
export default Props_Form_Modify_Product;
