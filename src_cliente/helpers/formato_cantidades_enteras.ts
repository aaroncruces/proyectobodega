// todo: cantidades flotantes (reconociendo digitos separadores)
import replace from "voca/replace";
import currency from "currency.js";
/**
 * Retorna cómo se debe formatear un numero entero
 * @param value <1234567> valor de una cantidad entera ingresada
 * @returns <"1.234.567"> texto de la cantidad como numero entero con separaciones
 */
const valueToString = (value: number): string =>
  currency(value, {
    symbol: "",
    decimal: ",",
    separator: ".",
    precision: 0,
  }).format();

const valueToNumber = (text: string): number =>
  Number.parseInt(replace(text, /\D/g, "")) || 0;
/**
 * Retorna cómo se debe formatear una cantidad de dinero
 * @param value <1234567> valor de una cantidad entera ingresada
 * @returns <"$ 1.234.567"> texto de la cantidad  como valor de dinero
 */
const valueToMoney = (value: number): string =>
  currency(value, {
    symbol: "$ ",
    decimal: ",",
    separator: ".",
    precision: 0,
  }).format();

export { valueToString, valueToNumber, valueToMoney };
