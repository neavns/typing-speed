import { useState, useEffect, useRef, ChangeEvent, ChangeEventHandler } from 'react';
import './App.css';

import Timer from './components/Timer';
import Input from './components/Input';

import words from './utils/words'
import isCorrectWord from './utils/isCorrectWord'
import randomiseWords from './utils/randomiseWords'

import type Stats from './types/stats';
import type Word from './types/word';
import WordList from './components/WordList';
import StatsList from './components/StatsList';
import StatTile from './components/StatsList/StatTile';
import Tooltip from './components/Tooltip';

const randomisedWords = randomiseWords(words)


function App() {
  const [stats, setStats] = useState<Stats>({
    correctWords: 0,
    incorrectWords: 0,
    totalWords: 0,
    accuracy: 0
  })
  const [state, setState] = useState<Word[]>(randomisedWords)
  const [inputValue, setInputValue] = useState<string>('')
  const [time, setTime] = useState<number>(60)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const intervalRef = useRef<any>(null)
  const [typedWords, setTypedWords] = useState<Word[]>([])
  const [currentWord, setCurrentWord] = useState<Word>(randomisedWords[0])
  const [focusInput, setFocusInput] = useState<boolean>(false)
  const [inputClassName, setInputClassName] = useState<string>('')

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

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    validateInput(value)
    setInputValue(value)
    state.shift()
    const word: Word = processWord(value, currentWord)
    setState([word, ...state])
  }

  const processWord = (input: string, word: Word): Word => {
    let newWord = { ...word }

    for(let i = 0; i < input.length; i++) {
      if(input[i] === word.text[i]) {
        newWord.text = newWord.text.slice(1)
      } else {
        break
      }
    }
    return newWord
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleSpaceKeyPress = (e: KeyboardEvent) => {
    if(e.key !== ' ' || !inputValue) return
    const isCorrect = isCorrectWord(inputValue, currentWord?.text || '')
    state.shift()
    setState(state)
    setCurrentWord(state[0])
    setTypedWords([...typedWords, {text: inputValue, isCorrect}])
    setInputValue('')
    updateStats(isCorrect)
  }

  const updateStats = (isCorrect: boolean) => {
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

  const validateInput = (input: string) => {
    if(!currentWord.text.startsWith(input)) {
      setInputClassName('incorrect')
    } else {
      setInputClassName('')
    }
  }

  const reset = () => {
    // todo - reset app when clicking on timer
    // todo - start app when user starts typing 
  }

  return (
    <div className="App">
      <header className="App-header">
        <section id='main-app'>
          <div className="stats">
            <StatsList>
              <Timer time={time} label='seconds' onClick={handleStartStop} />
              <StatTile stat={stats.correctWords} label='wpm' />
              <StatTile stat={stats.totalWords} label='attemps' />
              <StatTile stat={stats.accuracy} label='% accuracy' />
            </StatsList>
          </div>
          <div className='main' onClick={handleInputFocus}>
            { !isRunning && <Tooltip label='Start typing' /> }
            <section className='section section1'>
              <WordList words={typedWords} overflowDirection='rtl' />
              <Input className={inputClassName} value={inputValue} onChange={handleInputChange} onSpace={handleSpaceKeyPress} size={(inputValue.length || 1)} focus={focusInput} onBlur={handleInputFocus} />
            </section>
            <section className='section section2'>
              <WordList words={state} />
            </section>
          </div>
        </section>
      </header>
    </div>
  );
}

export default App;
