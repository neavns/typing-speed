import style from './style.module.css'

const Footer: React.FC = () => {
  return <footer className={style.footer}>
    <span>Created by <a target='_target' href="https://github.com/neavns">John Gaina</a></span>
    <span>Inspired by <a target='_target' href="https://www.livechat.com/typing-speed-test">livechat.com</a> 🚀</span>
  </footer>
}

export default Footer