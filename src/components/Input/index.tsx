import {  ChangeEventHandler, FormEventHandler } from "react"
import style from './style.module.css'

interface Props {
  value: string,
  onChange: ChangeEventHandler<HTMLInputElement>,
  onSubmit: FormEventHandler<HTMLFormElement>
}

const Input: React.FunctionComponent<Props> = ({ value, onChange, onSubmit }) => {

  return <form onSubmit={onSubmit}>
    <input className={style.input} type="text" onChange={onChange} value={value} />
  </form>
}

export default Input