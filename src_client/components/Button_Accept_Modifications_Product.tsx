import { connect } from "react-redux";
import Props_Button from "./prop_types/type_props_button";
import Button from "./Button";
import {
  patchTextToDBAndRefetch,
  postTextToDBAndCache,
} from "../redux/cachedProductList/cachedProductListActionCreators";
import {
  onInput as descriptionFormatInput,
  onBlur as descriptionFormatBlur,
} from "../helpers/formato_descripciones";
import {
  onInput as codesFormatInput,
  onBlur as codesFormatBlur,
} from "../helpers/formato_codigos";
import { valueToNumber } from "../helpers/formato_cantidades_enteras";
import {
  codigo_barrasFromState,
  cachedProductListFromState,
  marcaFromState,
  modeloFromState,
  skuFromState,
  marcaActiveFromState,
  codigo_barrasActiveFromState,
  modeloActiveFromState,
  cantidadActiveFromState,
  ubicacionActiveFromState,
  precioVentaNetoActiveFromState,
  precioVentaBrutoActiveFromState,
  descripcionActiveFromState,
  cantidadFromState,
  ubicacionFromState,
  descripcionFromState,
  precioVentaNetoFromState,
} from "../redux/StateValueExtractor";
import { lowerCase } from "voca";

const mapStateToProps = (state): Props_Button => ({
  label: checkStateForLabel(state),
  cssClass:
    checkStateForLabel(state) == SUCCESSFUL_LABEL
      ? "ms-2 btn btn-primary"
      : "ms-2 btn btn-danger",
  invalid: checkStateForLabel(state) != SUCCESSFUL_LABEL,
});

const SUCCESSFUL_LABEL = "Aplicar Cambios";
const checkStateForLabel = (state: any): string => {
  if (!isParameterSelected(state)) return "Seleccione un cuadro";
  if (codigo_barrasActiveFromState(state) && !codigo_barrasChanged(state))
    return "Modifique el C. Barras";
  if (codigo_barrasActiveFromState(state) && !codigo_barrasUnique(state))
    return "C. Barras ya existe";
  if (modeloActiveFromState(state) && !modeloChanged(state))
    return "Modifique el Nombre";
  if (modeloActiveFromState(state) && !modeloChanged(state))
    return "Modifique el Nombre";
  if (modeloActiveFromState(state) && existingModeloMarcaCombination(state))
    return "Ya existe una Marca con ese Nombre";
  if (
    modeloActiveFromState(state) &&
    descriptionFormatBlur(descriptionFormatInput(modeloFromState(state))) == ""
  )
    return "El producto debe tener un nombre";
  if (marcaActiveFromState(state) && !marcaChanged(state))
    return "Modifique la Marca";
  if (marcaActiveFromState(state) && existingModeloMarcaCombination(state))
    return "Ya existe un Nombre con esa Marca";
  if (cantidadActiveFromState(state) && !cantidadChanged(state))
    return "Modifique la Cantidad";
  if (ubicacionActiveFromState(state) && !ubicacionChanged(state))
    return "Modifique la Ubicacion";
  if (descripcionActiveFromState(state) && !descripcionChanged(state))
    return "Modifique la Descripcion";
  if (precioVentaNetoActiveFromState(state) && !precio_venta_netoChanged(state))
    return "Modifique el Precio Neto";
  if (
    precioVentaBrutoActiveFromState(state) &&
    !precio_venta_netoChanged(state)
  )
    return "Modifique el Precio Bruto";
  return SUCCESSFUL_LABEL;
};
const isParameterSelected = (state): boolean =>
  !codigo_barrasActiveFromState(state) ||
  !modeloActiveFromState(state) ||
  !cantidadActiveFromState(state) ||
  !ubicacionActiveFromState(state) ||
  !marcaActiveFromState(state) ||
  !precioVentaNetoActiveFromState(state) ||
  !precioVentaBrutoActiveFromState(state) ||
  !descripcionActiveFromState(state);

//todo: al aplicar cambios, refrescar cached (supongo que en las forms, para que aparezca el throbber)

const codigo_barrasChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      lowerCase(codesFormatBlur(codesFormatInput(product.codigo_barras))) ==
        lowerCase(
          codesFormatBlur(codesFormatInput(codigo_barrasFromState(state)))
        )
  );
const codigo_barrasUnique = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.codigo_barras))) ==
      lowerCase(
        codesFormatBlur(codesFormatInput(codigo_barrasFromState(state)))
      )
  );
const modeloChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      lowerCase(
        descriptionFormatBlur(descriptionFormatInput(product.modelo))
      ) ==
        lowerCase(
          descriptionFormatBlur(descriptionFormatInput(modeloFromState(state)))
        )
  );
const existingModeloMarcaCombination = (state): boolean =>
  !!cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(product.modelo) ==
        lowerCase(
          descriptionFormatBlur(descriptionFormatInput(modeloFromState(state)))
        ) &&
      lowerCase(product.marca) ==
        lowerCase(
          descriptionFormatBlur(descriptionFormatInput(marcaFromState(state)))
        )
  );
const marcaChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      lowerCase(descriptionFormatBlur(descriptionFormatInput(product.marca))) ==
        lowerCase(
          descriptionFormatBlur(descriptionFormatInput(marcaFromState(state)))
        )
  );
const ubicacionChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      lowerCase(
        descriptionFormatBlur(descriptionFormatInput(product.ubicacion))
      ) ==
        lowerCase(
          descriptionFormatBlur(
            descriptionFormatInput(ubicacionFromState(state))
          )
        )
  );

const descripcionChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      lowerCase(
        descriptionFormatBlur(descriptionFormatInput(product.descripcion))
      ) ==
        lowerCase(
          descriptionFormatBlur(
            descriptionFormatInput(descripcionFromState(state))
          )
        )
  );
const cantidadChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      Math.ceil(product.cantidad) == Math.ceil(cantidadFromState(state))
  );
const precio_venta_netoChanged = (state): boolean =>
  !cachedProductListFromState(state)?.find(
    (product) =>
      lowerCase(codesFormatBlur(codesFormatInput(product.sku))) ==
        lowerCase(codesFormatBlur(codesFormatInput(skuFromState(state)))) &&
      (Math.ceil(product.precio_venta_neto) ==
        Math.ceil(precioVentaNetoFromState(state)) ||
        Math.ceil(product.precio_venta_neto) ==
          Math.floor(precioVentaNetoFromState(state)) ||
        Math.floor(product.precio_venta_neto) ==
          Math.ceil(precioVentaNetoFromState(state)) ||
        Math.floor(product.precio_venta_neto) ==
          Math.floor(precioVentaNetoFromState(state)))
  );

const mapDispatchToProps = (dispatch: (any) => any): Props_Button => ({
  onClick: () => {
    dispatch(patchTextToDBAndRefetch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Button);
