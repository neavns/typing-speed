import { MouseEventHandler } from 'react'
import style from './style.module.css'

interface Props {
  time: number,
  label?: string,
  onClick: MouseEventHandler<HTMLDivElement>
}

const Counter: React.FunctionComponent<Props> = ({ time, label, onClick }) => {
  return <div className={style.timer} onClick={onClick}>
    <svg className={style.svg}>
      {/* <circle className={[style.svg_circle, style.static_circle].join(' ')} cx="50" cy="50" r="48"></circle> */}
      <circle style={{ strokeDashoffset: 60 - time }} className={[style.svg_circle, style.progress_circle].join(' ')} cx="50%" cy="50%" r="48%" pathLength={60}></circle>
    </svg>
    <span className={style.time}>{time}</span>
    <span className={style.label}>{label}</span>
  </div>
}

export default Counter