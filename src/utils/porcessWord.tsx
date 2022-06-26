import type Word from "../types/word"

const processWord = (input: string, word: Word): Word => {
  let newWord = { ...word }

  for (let i = 0; i < input.length; i++) {
    if (input[i] === word.text[i]) {
      newWord.text = newWord.text.slice(1)
    } else {
      break
    }
  }
  return newWord
}

export default processWord