/**
 * Sencillamente un type para enforzar la estructura del state en los elementos
 * que usan esta propiedad del producto.
 * todo: no deberia haber invalid, es responsabilidad del formulario saber si es invalido
 */
type StateSku = {
  sku: string;
  invalidSku: boolean;
  invalidSkuMessage: string;
};
export default StateSku;
