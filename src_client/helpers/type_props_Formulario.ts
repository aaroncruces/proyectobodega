import Producto from "../../src_server/types/Producto";

type Props_Formulario_Ingreso = {
  listaProductosDB?: Producto[];

  //El formulario necesita saber si la combinacion modelo/marca se repite
  textboxModelo?: string;
  textboxMarca?: string;
  fetchListaProductos?: () => any;
};
export default Props_Formulario_Ingreso;
