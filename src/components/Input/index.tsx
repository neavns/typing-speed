import { ChangeEventHandler, useEffect, useRef, useState } from "react"
import style from './style.module.css'

interface Props {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  size?: number | undefined,
  onSpace: (e: KeyboardEvent) => void,
  focus: boolean,
  onBlur: () => void,
  className?: string,
  disabled?: boolean,
}

const Input: React.FunctionComponent<Props> = ({ value, onChange, onSpace, size, focus, onBlur, className = '', disabled = false }) => {
  const [classes, setClasses] = useState(className)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => {
    document.addEventListener('keydown', onSpace)

    return () => document.removeEventListener('keydown', onSpace)
  }, [onSpace])

  useEffect(() => {
    if (focus) {
      ref.current?.focus()
    }
  }, [focus])

  useEffect(() => {
    const classString = className.split(' ').map((c: string) => style[c]).join(' ')
    setClasses(classString)
  }, [className])

  return <input ref={ref} className={[style.input, classes].join(' ')} type="text"  onChange={onChange} value={value} size={size} onBlur={onBlur} disabled={disabled} />
}

export default Input