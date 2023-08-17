export const firstLetterOfWord = (word: string) :string => {
  const arrWord = word.split(' ')
  return arrWord.map(([l]) => l).join('')
}