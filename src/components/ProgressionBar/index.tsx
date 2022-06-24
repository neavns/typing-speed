import style from './style.module.css'

interface Props {
  currentWord: string,
  nextWords: [string],
}

const ProgressionBar: React.FunctionComponent<Props> = ({ currentWord, nextWords }) => {
  return <div className={style.bar}>
    <span className={style.current}><small className={style.small}>Current:</small> {currentWord}</span>
    <span className={style.next}>
      <small className={style.small}>Next:</small> {nextWords.map((w: string, i: number) => <span key={i}>{w}</span>)}
    </span>
  </div>
}

export default ProgressionBar