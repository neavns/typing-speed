import type { Stats } from '../../types/stats';
import style from './style.module.css';


const Results: React.FunctionComponent<Stats> = ({ correctWords, incorrectWords, totalWords, accuracy }) => {
  return <div className={style.results}>
    <div className={[style.thead, style.common].join(' ')}>
        <span>Correct words</span>
        <span>Incorrect words</span>
        <span>Total words</span>
        <span>Accuracy</span>
    </div>
    <div className={[style.body, style.common].join(' ')}>
      <span>{correctWords}</span>
      <span>{incorrectWords}</span>
      <span>{totalWords}</span>
      <span>{accuracy.toFixed() || 0}%</span>
    </div>
  </div>
}

export default Results