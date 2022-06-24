const randomiseWords = (words: string[]) => {
  const randomisedWords = words.sort(() => Math.random() - 0.5)
  return randomisedWords
}

export default randomiseWords