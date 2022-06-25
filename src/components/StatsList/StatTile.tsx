import style from './style.module.css'

interface Props {
  stat: number | string,
  label: string
}

const StatTile: React.FunctionComponent<Props> = ({ stat, label }) => {
  return <div>
    <span className={style.tile}>{stat}</span>
    <span className={style.label}>{label}</span>
  </div>
}

export default StatTile