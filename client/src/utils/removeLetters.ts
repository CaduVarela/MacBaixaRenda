export const removeLetters = (value: string) => {
  const characterArray = value?.split('');

  const newArray = characterArray?.filter((item) => {
    // verifica se cada item do array é um número usando o método "isNaN" 
    // e o operador "+" para tentar converter o item em um número

    if (isNaN(+item)) {
      return false;
    }
    return true;
  });

  return newArray?.join('');
};