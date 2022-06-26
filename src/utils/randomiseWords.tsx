import type Word from '../types/word'

const randomiseWords = (words: Word[]): Word[] => words.sort(() => Math.random() - 0.5)

export default randomiseWords