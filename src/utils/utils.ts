export const firstLetterOfWord = (word: string) :string => {
  const arrWord = word.split(' ')
  return arrWord.map(([l]) => l).join('')
}

export const isElementOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }: { clientWidth: number, clientHeight: number, scrollWidth: number, scrollHeight: number}) => {
  return scrollHeight > clientHeight || scrollWidth > clientWidth;
}