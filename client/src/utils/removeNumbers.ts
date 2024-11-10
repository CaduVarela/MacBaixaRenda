import { invalidCharacters } from "./constants";

export function removeNumbers(value: string) {
  const characterArray = value?.split('');

  const newArray = characterArray?.filter((item) => {
    const isAnInvalidCharacter = invalidCharacters.some((el) => el === item);

    if (isAnInvalidCharacter) {
      // --> verifica se não é um número ou se é um espaço em branco
      // --> verifica se não é um caractere inválido que deve ser excluído do array resultante
      return (isNaN(item as unknown as number) || item === ' ') && !isAnInvalidCharacter;
    }
    return isNaN(item as unknown as number) || item === ' ';
  });

  return newArray?.join('');
}