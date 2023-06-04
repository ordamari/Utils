export function findCharIndexesBetweenIndexes(
  input: string,
  char: string,
  startIndex?: number,
  endIndex?: number
) {
  startIndex = startIndex || 0;
  endIndex = endIndex || input.length;
  const charIndexes: number[] = [];
  let currentIndex = input.indexOf(char, startIndex);

  while (currentIndex !== -1 && currentIndex < endIndex) {
    charIndexes.push(currentIndex);
    currentIndex = input.indexOf(char, currentIndex + 1);
  }

  return charIndexes;
}
