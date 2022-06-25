import style from './style.module.css'
import type Word from '../../types/word'

interface Props {
  words: Word[],
  overflowDirection?: 'rtl' | 'ltr'
  className?: string,
}

const WordList: React.FunctionComponent<Props> = ({ words, className, overflowDirection = 'ltr' }) => {

  const getClassname = (word: Word) => {
    let className = ''
    switch(word.isCorrect) {
      case true: className = 'correct'; break
      case false: className = 'incorrect'; break
      default: break
    }

    return className
  }

  return <div className={`${style.list} ${className || ''} ${style[`use-${overflowDirection}`]}`}>
    {words.map((word: Word, i: number) => <span className={[style.word, word.isCorrect !== null && style[getClassname(word)]].join(' ')} key={`${word.text}_${i}`}>{word.text}</span>)}
  </div>
}

export default WordList