import { useState, useEffect, ChangeEvent, ChangeEventHandler } from 'react'
import './App.css'

import Timer from './components/Timer'
import Input from './components/Input'

import words from './utils/words'
import isCorrectWord from './utils/isCorrectWord'
import randomiseWords from './utils/randomiseWords'
import processWord from './utils/porcessWord'

import type Stats from './types/stats'
import type Word from './types/word'
import WordList from './components/WordList'
import StatsList from './components/StatsList'
import StatTile from './components/StatsList/StatTile'
import Tooltip from './components/Tooltip'
import Footer from './components/Footer'

function App() {
  const [stats, setStats] = useState<Stats>({
    correctWords: 0,
    incorrectWords: 0,
    totalWords: 0,
    accuracy: 0
  })
  const [state, setState] = useState<Word[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [time, setTime] = useState<number>(60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [typedWords, setTypedWords] = useState<Word[]>([])
  const [currentWord, setCurrentWord] = useState<Word>({ text: '' })
  const [focusInput, setFocusInput] = useState<boolean>(false)
  const [inputClassName, setInputClassName] = useState<string>('')
  const [isDisabledInput, setIsDisabledInput] = useState<boolean>(false)
  const [timerLabel, setTimerLabel] = useState<string>('seconds')
  const [showTooltip, setShowTooltip] = useState<boolean>(true)

  useEffect(() => {
    getWords()
  }, [])
  
  const getWords = (): void => {
    const randomisedWords: Word[] = randomiseWords(words)
    setState(randomisedWords)
    setCurrentWord(randomisedWords[0])
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>): void => {
    startTimer()
    const value = e.target.value.trim()
    validateInput(value)
    setInputValue(value)
    state.shift()
    const word: Word = processWord(value, currentWord)
    setState([word, ...state])
  }

  const handleSpaceKeyPress = (e: KeyboardEvent): void => {
    if(e.key !== ' ' || !inputValue) return
    const isCorrect = isCorrectWord(inputValue, currentWord?.text || '')
    state.shift()
    setState(state)
    setCurrentWord(state[0])
    setTypedWords([...typedWords, {text: inputValue, isCorrect}])
    setInputValue('')
    updateStats(isCorrect)
  }

  const updateStats = (isCorrect: boolean): void => {
    const correctWords = isCorrect ? stats.correctWords + 1 : stats.correctWords
    const incorrectWords = isCorrect ? stats.incorrectWords : stats.incorrectWords + 1
    const totalWords = stats.totalWords + 1
    setStats({
      ...stats,
      correctWords,
      incorrectWords,
      totalWords,
      accuracy: Math.round((correctWords / totalWords) * 100) || 0
    })
  }

  const handleInputFocus = () => setFocusInput(!focusInput)

  const validateInput = (input: string): void => {
    if(!currentWord.text.startsWith(input)) {
      setInputClassName('incorrect')
    } else {
      setInputClassName('')
    }
  }

  const startTimer = (): void => {
    if(!isRunning) setIsRunning(true)
    setShowTooltip(false)
  }

  const reset = (): void => {
    setIsRunning(false)
    setTypedWords([])
    setShowTooltip(true)
    setTime(60)
    setTimerLabel('seconds')
    setInputValue('')
    getWords()
    setStats({
      correctWords: 0,
      incorrectWords: 0,
      totalWords: 0,
      accuracy: 0
    })
  }

  const onTimeUp = (): void => {
    setIsRunning(false)
    setIsDisabledInput(true)
  }

  const onTimerHover = (): void => {
    if(isRunning || time === 0) setTimerLabel(timerLabel === 'seconds' ? 'restart?' : 'seconds')
  }
  const handleTimerChange = (time: number): void => setTime(time)

  return (
    <div className="App">
        <section id='main-app'>
          <h1>Test your typing speed!</h1>
          <div className="stats">
            <StatsList>
              <Timer time={time} label={timerLabel} onFinish={onTimeUp} onChange={handleTimerChange} onClick={reset} start={isRunning} onHover={onTimerHover} />
              <StatTile stat={stats.correctWords} label='wpm' />
              <StatTile stat={stats.totalWords} label='attempts' />
              <StatTile stat={stats.accuracy} label='% accuracy' />
            </StatsList>
          </div>
          <div className='main' onClick={handleInputFocus}>
            { showTooltip && <Tooltip label='Start typing' /> }
            <section className='section section1'>
              <WordList words={typedWords} overflowDirection='rtl' />
              <Input 
                className={inputClassName} 
                value={inputValue} 
                onChange={handleInputChange} 
                onSpace={handleSpaceKeyPress} 
                size={(inputValue.length || 1)} 
                focus={focusInput} 
                onBlur={handleInputFocus} 
                disabled={isDisabledInput}
                />
            </section>
            <section className='section section2'>
              <WordList words={state} />
            </section>
          </div>
          { time === 0 && <span className='timeup'>Time is up! Click on the timer to restart</span> }
        </section>
        <Footer />
    </div>
  );
}

export default App;
