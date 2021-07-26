// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Datalist_sku from "./Datalist_sku";
import Inputbox_codigo_barras from "./Inputbox_codigo_barras";
import Inputbox_modelo from "./Inputbox_modelo";
import Inputbox_cantidad from "./Inputbox_cantidad";
import Inputbox_ubicacion from "./Inputbox_ubicacion";
import Inputbox_marca from "./Inputbox_marca";
import Inputbox_precio_venta_neto from "./Inputbox_precio_venta_neto";
import Inputbox_precio_venta_bruto from "./Inputbox_precio_venta_bruto";
import Inputbox_iva from "./Inputbox_iva";
import Inputbox_descripcion from "./Inputbox_descripcion";
import Button_Ingreso_Productos from "./Button_Ingreso_Productos";
import Throbber from "./Throbber";
// helpers & utilities
import Producto from "../../src_servidor/tipos/Producto";
import Props_Formulario_Ingreso from "../helpers/type_props_Formulario";
import Props_inputbox from "../helpers/type_props_Inputbox";
// redux custom
import StatelistaProductos from "../redux/listaProductos/type_state_listaProductos";
import { fetchListaProductos } from "../redux/listaProductos/listaProductosActionCreators";
import StateModelo from "../redux/modelo/type_state_modelo";
import StateMarca from "../redux/marca/type_state_marca";

class Formulario_Modificar_Producto extends Component<Props_Formulario_Ingreso> {
  constructor(props) {
    super(props);
    //Cargando los productos de la db a la store
    this.props.fetchListaProductos();
  }

  SKU_EMPTY_MESSAGE = "SKU es obligatorio";

  skuInvalid_ListNotFetched = (text: string) =>
    text == "" ? this.SKU_EMPTY_MESSAGE : "";

  skuInvalidOrRepeated_ListFetched = (text: string) => {
    if (text == "") return this.SKU_EMPTY_MESSAGE;
    const productoEncontrado: Producto = this.props.listaProductosDB.find(
      (producto) => producto.sku == text
    );
    return productoEncontrado
      ? `El producto ya existe. ${productoEncontrado.modelo} ${productoEncontrado.marca}`
      : "";
  };
  CODIGO_BARRAS_REPEATED_MESSAGE = "Ya existe un producto con este codigo";
  codigoBarrasRepeated_ListFetched = (text: string) =>
    this.props.listaProductosDB.find(
      (producto) => text != "" && producto.codigo_barras == text
    )
      ? this.CODIGO_BARRAS_REPEATED_MESSAGE
      : "";

  MODELO_EMPTY_MESSAGE = "Nombre del modelo es obligatorio";

  modeloInvalid_ListNotFetched = (text: string) =>
    text == "" ? this.MODELO_EMPTY_MESSAGE : "";

  modeloInvalidOrMarcaRepeated_ListFetched = (text: string) => {
    if (text == "") return this.MODELO_EMPTY_MESSAGE;
    const productoEncontrado: Producto = this.props.listaProductosDB.find(
      (producto) =>
        producto.modelo == text && producto.marca == this.props.textboxMarca
    );
    return productoEncontrado
      ? `El producto con marca ${productoEncontrado.marca} ya tiene este modelo.`
      : "";
  };

  marcaAndModeloRepeated_ListFetched = (text: string) => {
    const productoEncontrado: Producto = this.props.listaProductosDB.find(
      (producto) =>
        producto.marca == text && producto.modelo == this.props.textboxModelo
    );

    return productoEncontrado
      ? `El producto con modelo ${productoEncontrado.modelo} ya tiene esta marca.`
      : "";
  };

  render() {
    const propsSku: Props_inputbox = {
      cssClassContainer: "col-md-4 form-group",
      //debe definirse aqui (en render()), si no, no queda dinamico
      invalidComparator:
        this.props.listaProductosDB == undefined
          ? this.skuInvalid_ListNotFetched
          : this.skuInvalidOrRepeated_ListFetched,
    };
    const propsCodigoBarras: Props_inputbox = {
      cssClassContainer: "col-md-3 form-group",
      invalidComparator:
        this.props.listaProductosDB == undefined
          ? () => ""
          : this.codigoBarrasRepeated_ListFetched,
    };

    const propsModelo: Props_inputbox = {
      cssClassContainer: "col-md-5 form-group",
      invalidComparator:
        this.props.listaProductosDB == undefined
          ? this.modeloInvalid_ListNotFetched
          : this.modeloInvalidOrMarcaRepeated_ListFetched,
    };
    const propsMarca: Props_inputbox = {
      cssClassContainer: "col-md-4 form-group",
      invalidComparator:
        this.props.listaProductosDB == undefined
          ? () => ""
          : this.marcaAndModeloRepeated_ListFetched,
    };
    const propsButtonIngreso = {
      className: "me-3 mt-3 btn btn-primary",
      testInvalid:
        this.props.listaProductosDB == undefined
          ? () => false
          : this.marcaAndModeloRepeated_ListFetched,
    };
    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Datalist_sku cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_codigo_barras {...propsCodigoBarras} />
            {/*//@ts-ignore */}
            <Inputbox_modelo {...propsModelo} />
          </div>
          <div className="row mb-4">
            {/*//@ts-ignore */}
            <Inputbox_cantidad cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_ubicacion cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_marca {...propsMarca} />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_neto cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_iva cssClassContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_bruto cssClassContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_descripcion cssClassContainer="col-md-12 form-group" />
          </div>
          <div className="d-flex align-items-center">
            <Button_Ingreso_Productos />
            {this.props.listaProductosDB === undefined && (
              <div className="ms-auto">
                <Throbber />
              </div>
            )}
          </div>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state: any): Props_Formulario_Ingreso => ({
  listaProductosDB: (state.listaProductosReducer as StatelistaProductos)
    .listaProductos,
  textboxModelo: (state.modeloReducer as StateModelo).modelo,
  textboxMarca: (state.marcaReducer as StateMarca).marca,
});

const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Formulario_Ingreso => ({
  //thunk
  fetchListaProductos: () => dispatch(fetchListaProductos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formulario_Modificar_Producto);
