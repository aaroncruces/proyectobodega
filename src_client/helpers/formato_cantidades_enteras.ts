// todo: cantidades flotantes (reconociendo digitos separadores)
import replace from "voca/replace";
import currency from "currency.js";

const valueToString = (value: number): string =>
  currency(value, {
    symbol: "",
    decimal: ",",
    separator: ".",
    precision: 0,
  }).format();

const valueToNumber = (text: string): number =>
  Number.parseInt(replace(text, /\D/g, "")) || 0;

const valueToMoney = (value: number): string =>
  currency(value, {
    symbol: "$ ",
    decimal: ",",
    separator: ".",
    precision: 0,
  }).format();

export { valueToString, valueToNumber, valueToMoney };
