/* eslint-disable react/prop-types */
import { useState } from 'react'

export default function App() {
  const [start, setStart] = useState(false)
  const [titleLevel, setTitleLevel] = useState('')
  const [limitNumber, setLimitNumber] = useState(0)
  const [chance, setChance] = useState(0)
  const [randomNumber, setRandomNumber] = useState(0)
  const [userGuess, setUserGuess] = useState('')
  const [clue, setClue] = useState('')
  const [correctAnswer, setCorrectAnswer] = useState(false)

  const level = {
    easy: {
      title: 'Easy',
      number: 100,
      chance: 10,
    },
    normal: {
      title: 'Normal',
      number: 550,
      chance: 6,
    },
    hard: {
      title: 'Hard',
      number: 1000,
      chance: 2,
    },
  }

  const DifficultyButton = ({ title, color, chance, number, handleStart }) => {
    const handleLevel = () => {
      handleStart(chance, number, title)
    }
    return (
      <div className="flex flex-col w-[40%] mx-auto">
        <button onClick={handleLevel} className={`text-white font-semibold px-5 py-2 ${color} rounded-lg flex flex-col justify-center items-center`}>
          {title} <span> 1 - {number}</span> <span>{chance} Chance</span>
        </button>
      </div>
    )
  }

  const handleStart = (chance, number, title) => {
    setRandomNumber(Math.floor(Math.random() * number + 1))
    setChance(chance)
    setTitleLevel(title)
    setLimitNumber(number)
    setStart(true)
  }

  const handleGuess = () => {
    setChance((prevChance) => {
      if (prevChance > 0 && userGuess.length !== 0) {
        if (parseInt(randomNumber) === parseInt(userGuess)) {
          setClue('The Number ')
          setCorrectAnswer(true)
          setUserGuess('')
          return prevChance
        } else {
          if (parseInt(randomNumber) < parseInt(userGuess)) {
            setClue('Smaller Than')
            setUserGuess('')
          } else {
            setClue('Greater Than')
            setUserGuess('')
          }
          return prevChance - 1
        }
      } else {
        return prevChance
      }
    })
  }

  const handleTryAgain = () => {
    setStart(false)
    setCorrectAnswer(false)
    setClue('')
  }

  const handleUserGuess = (e) => {
    setUserGuess(e.target.value)
  }

  return (
    <>
      <div className={`h-dvh flex flex-col gap-10 justify-center  ${start ? 'hidden' : ' '}`}>
        <div>
          <h1 className="text-2xl text-center font-bold ">Guess The Number !</h1>
        </div>

        <div className="w-full text-center">
          <div className="flex flex-col justify-center gap-5">
            <DifficultyButton title={level.easy.title} color={'bg-green-700'} chance={level.easy.chance} number={level.easy.number} handleStart={handleStart} />
            <DifficultyButton title={level.normal.title} color={'bg-yellow-700'} chance={level.normal.chance} number={level.normal.number} handleStart={handleStart} />
            <DifficultyButton title={level.hard.title} color={'bg-red-700'} chance={level.hard.chance} number={level.hard.number} handleStart={handleStart} />
          </div>
        </div>
      </div>

      <div className={`px-5 h-dvh flex flex-col gap-5 justify-center || xl:w-[30%] xl:mx-auto ${start ? ' ' : 'hidden'}`}>
        <h1 className="font-semibold flex flex-col gap-2">
          Difficulty : {titleLevel} <span>Number : 1 - {limitNumber}</span>
        </h1>
        <h1 className="text-center font-bold text-xl">How Much Am I ?</h1>
        {clue ? (
          <p className="text-center">
            I&apos;m <span className="font-bold">{clue} </span> You Think
          </p>
        ) : null}

        <input onChange={handleUserGuess} type="number" value={userGuess} className="p-3 border border-slate-700 rounded-lg" disabled={correctAnswer} />
        <button onClick={handleGuess} className="text-white font-semibold rounded-lg p-3 bg-blue-700">
          Try To Guess
        </button>

        <p className="font-semibold">Chance : {chance === 0 ? "It's Over, You Lost, The Answer Is " + randomNumber : chance}</p>
        <div className={correctAnswer ? ' ' : 'hidden'}>
          <h1 className="font-semibold bg-green-700 text-white p-2 rounded-lg text-center flex flex-col">
            Congratulation, Your Guess is Correct ! <span>The Answer is {randomNumber}</span>
          </h1>
        </div>
        <div className={correctAnswer || chance === 0 ? ' ' : 'hidden'}>
          <button onClick={handleTryAgain} className="text-white font-semibold rounded-lg w-[30%] p-2 bg-yellow-500">
            Try Again
          </button>
        </div>
      </div>
    </>
  )
}
