export function uppercaseInitialLetters(string: string) {
  const newArray: string[] = [];

  if (typeof string !== 'string') {
    return '';
  }

  if (!string) {
    return '';
  }

  string.split(' ').forEach((word) => {
    // a primeira letra da palavra é convertida para maiúscula e as outras letras são convertidas para minúsculas 
    if (word != 'II') {
      newArray.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    } else {
      newArray.push(word.charAt(0).toUpperCase() + word.slice(1).toUpperCase());
    }
  });

  return newArray.join(' ');
}