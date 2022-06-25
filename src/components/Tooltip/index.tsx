import style from './style.module.css'

interface Props {
  label: string
}

const Tooltip: React.FC<Props> = ({ label }) => {
  return <div className={[style.tooltip, style.bounce].join(' ')}>
    <span>{label}</span>
  </div>
}

export default Tooltip