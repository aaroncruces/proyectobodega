/**
 * creacion de enum para manenjo de errores.
 * El mensaje de error, debe ser manejado en donde se lanze el error
 * todo: definir tipos de errores custom, y reemplazar el uso de este enum donde se use
 *  ! en condiciones normales, los errores 0,1,2 no deberian gatillarse
 *  ! se manejan en caso de haber error del programador
 */
export enum Errores_ingreso {
  PRODUCTO_NO_EXISTE,
  SKU_VACIA,
  MODELO_VACIO,
  SKU_REPETIDA,
  MODELO_MARCA_REPETIDA,
  CODIGO_BARRAS_NO_VACIO_REPETIDO,
  OTRO_ERROR,
}
