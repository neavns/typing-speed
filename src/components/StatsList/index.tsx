import style from './style.module.css'
interface Props {
  children: React.ReactElement | React.ReactElement[]
}

const StatsList: React.FunctionComponent<Props> = ({  children }) => {
  return <div className={style.wrapper}>
    { children }
  </div>
}

export default StatsList