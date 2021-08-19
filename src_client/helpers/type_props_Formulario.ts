import Product from "../../src_server/types/Product";

type Props_Formulario_Ingreso = {
  listaProductosDB?: Product[];

  //El formulario necesita saber si la combinacion modelo/marca se repite
  textboxModelo?: string;
  textboxMarca?: string;
  fetchListaProductos?: () => any;
  resetParamsAndFilteredLists?: () => any;
};
export default Props_Formulario_Ingreso;
