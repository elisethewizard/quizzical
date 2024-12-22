import React from 'react'
import {decode} from 'html-entities'
import Card from './components/Card'
import svgs from './images/svgs'

function App() {
  const [dataState, setDataState] = React.useState([])
  const [selectState, setSelectState] = React.useState([])
  const [gameState, setGameState] = React.useState('land')
  const [finalScore, setFinalScore] = React.useState(0)
  let score = 0

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }

  function startGame(){
    setDataState([])
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        const decodedData = data.results.map(obj => {
          return {
            question: decode(obj.question),
            answers: shuffle([...obj.incorrect_answers, obj.correct_answer].map(answer => decode(answer))),
            correctAnswer: decode(obj.correct_answer),
          }
        })
        setDataState(decodedData)
        setSelectState(decodedData.map(obj => {
          return {
            question: obj.question,
            correctAnswer: obj.correctAnswer,
            selectedAnswer: ''
          }
        }))
      })      
    setGameState('play')
    score = 0
  }

  function updateData(data){
    setSelectState(prevState => prevState.map(prevObj => {
      return {
        ...prevObj,
        selectedAnswer: prevObj.question === data.question ? data.selectedAnswer : prevObj.selectedAnswer
      }   
    }))
  }

  const quizElements = dataState.map(element => <Card 
    question={element.question} 
    answers={element.answers}
    correctAnswer={element.correctAnswer} 
    key={element.question} 
    sendData={updateData}
    gameState={gameState} />
  )

  function checkAnswers(e){
    e.preventDefault()
    selectState.forEach(obj => {
      if (obj.selectedAnswer === obj.correctAnswer) {
        score++
      }
    })
    setFinalScore(score)
    setGameState('check')
  }

  return (
    <div className='bg-cont'>
      {svgs.yellowBlob}
      {svgs.blueBlob}
      <div className='app-cont'>

        {gameState === 'land' && <div className='landing-cont'>
          <h1>Quizzical</h1>
          <h2>Test your trivia knowledge</h2>
          <button className='btn' onClick={startGame}>Start quiz</button>
        </div>}

        {gameState !== 'land' && <form onSubmit={checkAnswers}>
          {quizElements.length ? quizElements : <h1>Loading...</h1>}
          {gameState === 'play' && <button className='btn check-btn'>Check answers</button>}
        </form>}
        
        {gameState === 'check' && <div className='replay-cont'>
          <h1 className='score-text'>You scored {finalScore}/5 correct answers</h1>
          <button className='btn replay-btn' onClick={startGame}>Play again</button>
        </div>}

      </div>
    </div>
  )
}

export default App