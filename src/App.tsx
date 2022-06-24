import { useState, useEffect, useRef, ChangeEvent, ChangeEventHandler, FormEvent } from 'react';
import './App.css';

import Timer from './components/Timer';
import Input from './components/Input';
import ProgressionBar from './components/ProgressionBar';
import Results from './components/Results';

import words from './utils/words'
import isCorrectWord from './utils/isCorrectWord'
import randomiseWords from './utils/randomiseWords'

import type { Stats } from './types/stats';

const randomisedWords = randomiseWords(words)


function App() {
  const [stats, setStats] = useState<Stats>({
    correctWords: 0,
    incorrectWords: 0,
    totalWords: 0,
    accuracy: 0
  })
  const [state] = useState(randomisedWords)
  const [inputValue, setInputValue] = useState<string>('')
  const [time, setTime] = useState<number>(60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    if(time === 0) {
      clearInterval(intervalRef.current)
      return
    }

    if(isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(time => time - 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, time])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!inputValue) return
    const currentWord = state.shift() || ''
    const isCorrect = isCorrectWord(inputValue, currentWord)

    setStats({
      ...stats,
      correctWords: isCorrect ? stats.correctWords + 1 : stats.correctWords,
      incorrectWords: isCorrect ? stats.incorrectWords : stats.incorrectWords + 1,
      totalWords: stats.totalWords + 1,
      accuracy: Math.round((stats.correctWords / stats.totalWords) * 100)
    })

    setInputValue('')

  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    console.log(e.target.value)
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  return (
    <div className="App">
      <header className="App-header">
        <section id='main-app'>
          <Timer time={time} label='seconds' onClick={handleStartStop} />
          <div className='main'>
            <ProgressionBar currentWord={state[0]} nextWords={[state[1]]} />
            <Input value={inputValue} onChange={handleInputChange} onSubmit={onSubmit} />
            <Results {...stats} />
          </div>
        </section>
        <section id='results'>
        </section>

      </header>
    </div>
  );
}

export default App;
