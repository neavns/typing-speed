import { MouseEventHandler } from 'react'
import style from './style.module.css'

interface Props {
  time: number,
  label?: string,
  onClick: MouseEventHandler<HTMLDivElement>
}

const Counter: React.FunctionComponent<Props> = ({ time, label, onClick }) => {
  return <div className={style.timer} onClick={onClick}>
    <span className={style.time}>{time}</span>
    <span className={style.label}>{label}</span>
  </div>
}

export default Counter