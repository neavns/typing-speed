import type Word from '../types/word'

const randomiseWords = (words: string[]): Word[] => {
  const randomisedWords = words.sort(() => Math.random() - 0.5)
  return randomisedWords.map((w => ({ text: w })))
}

export default randomiseWords