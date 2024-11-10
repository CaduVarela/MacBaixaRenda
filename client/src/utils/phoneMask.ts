import { nonDigitCharacters } from "./constants";

export function phoneMask(number: string) {
  let value = number;

  if (typeof value !== 'string') {
    return '';
  }

  if (!value) {
    return '';
  }

  value = value.replace(nonDigitCharacters, '');
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
  value = value.replace(/(\d)(\d{4})$/, '$1-$2');

  return value;
}