import { useEffect } from 'react'
import style from './style.module.css'

interface Props {
  time: number,
  label?: string,
  onClick?: () => void,
  onFinish?: () => void,
  onHover?: () => void,
  onChange: (time:number) => void,
  start: boolean
}

const Counter: React.FunctionComponent<Props> = ({ time, label, onChange, onClick, onFinish, start, onHover }) => {

  useEffect(() => {
    let isMounted = true
    if(!start) return 
    if(time === 0) {
      onFinish?.()
      return
    }
    const interval = setInterval(() => isMounted && onChange(time - 1), 1000)
    return () => {
      clearInterval(interval)
      isMounted = false
    }
  }, [time, start])
  

  return <div className={style.timer} onClick={onClick} onMouseEnter={onHover} onMouseLeave={onHover}>
    <svg className={style.svg}>
      <circle style={{ strokeDashoffset: 60 - time }} className={[style.svg_circle, style.progress_circle].join(' ')} cx="50%" cy="50%" r="48%" pathLength={60}></circle>
    </svg>
    <span className={style.time}>{time}</span>
    <span className={style.label}>{label}</span>
  </div>
}

export default Counter