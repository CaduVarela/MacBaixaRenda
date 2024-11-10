import { nonDigitCharacters } from "./constants";

export function cepMask(cep: string) {
  return cep
    ?.replace(nonDigitCharacters, '')
    ?.replace(/(\d{5})(\d)/, '$1-$2')
    ?.trim();
}