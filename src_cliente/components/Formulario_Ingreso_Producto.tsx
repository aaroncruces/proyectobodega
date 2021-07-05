// react+redux vendor
import React, { Component } from "react";
import { connect } from "react-redux";
// Subcomponentes
import Inputbox_sku from "./Inputbox_sku";
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
// redux custom
import StatelistaProductos from "../redux/listaProductos/type_state_listaProductos";
import { fetchListaProductos } from "../redux/listaProductos/listaProductosActionCreators";

/**
 * todo: precargar los item de la db, y ponerle un spinner de cargando, o algo asi
 * todo: definir validez o invalidez de los inputbox, inValidMessage deberia estar en Inputbox,
 * todo: isValid deberia setearse en los reducers (o quiza en una subscription??) y en los State* (StateSku)
 * @returns
 */
class Formulario_Ingreso_Producto extends Component<Props_Formulario_Ingreso> {
  constructor(props) {
    super(props);
    //Cargando los productos de la db a la store
    this.props.fetchListaProductos();
  }

  render() {
    // Definiendo comparadores de invalidez para distintos cuadros de texto:
    // todo: usar https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    const MENSAJE_SKU_VACIO = "SKU es obligatorio";
    const skuInvalidComparator =
      this.props.listaProductos == undefined
        ? //antes de cargar la lista de productos, SKU no puede ser vacio
          (texto) => MENSAJE_SKU_VACIO
        : (texto) => {
            return "holakase";
            if (texto == "") {
              return MENSAJE_SKU_VACIO;
            }
            return "";
          };
    const propsSku = {
      classContainer: "col-md-4 form-group",
      invalidComparator: skuInvalidComparator,
    };
    return (
      <>
        <form className="container">
          <div className="row mb-3">
            {/* TS sigue tirando errores inutiles del tipo
      "...is not assignable to type 'IntrinsicAttributes..."
      cuando se trata de un componente hijo.
      No se como arreglarlo, asi que...
      //@ts-ignore */}
            <Inputbox_sku {...propsSku} />
            {/*//@ts-ignore */}
            <Inputbox_codigo_barras classContainer="col-md-3 form-group" />

            {/*//@ts-ignore */}
            <Inputbox_modelo classContainer="col-md-5 form-group" />
          </div>
          <div className="row mb-4">
            {/*//@ts-ignore */}
            <Inputbox_cantidad classContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_ubicacion classContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_marca classContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_neto classContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_iva classContainer="col-md-4 form-group" />
            {/*//@ts-ignore */}
            <Inputbox_precio_venta_bruto classContainer="col-md-4 form-group" />
          </div>
          <div className="row mb-3">
            {/*//@ts-ignore */}
            <Inputbox_descripcion classContainer="col-md-12 form-group" />
          </div>
          <div className="d-flex align-items-center">
            <Button_Ingreso_Productos />

            {
              //throbber para mustrar que se encuentran cargado los productos
              this.props.listaProductos === undefined && (
                <div className="ms-auto">
                  <Throbber />
                </div>
              )
            }
          </div>
        </form>
      </>
    );
  }
}
/**
 * Lo unico que necesita saber el qué productos tiene la DB
 * @param state
 * @returns
 */
const mapStateToProps = (state) => ({
  listaProductos: (state.listaProductosReducer as StatelistaProductos)
    .listaProductos,
});
/**
 * Para que, en caso de que no hayan productos, obtener productos de la DB
 * Dado que se necesita trackear cuando se ingresa un producto, se usa un thunk
 * @param dispatch
 * @returns
 */
const mapDispatchToProps = (
  dispatch: (any) => any
): Props_Formulario_Ingreso => ({
  fetchListaProductos: () => dispatch(fetchListaProductos()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Formulario_Ingreso_Producto);
