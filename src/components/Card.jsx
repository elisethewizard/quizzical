import React from 'react'
import Question from './Question'
import Answer from './Answer'

export default function Card(props){
    const [answerState, setAnswerState] = React.useState([])

    React.useEffect(() => {
        setAnswerState(props.answers.map(element => {
            return {
                value: element,
                isCorrect: element === props.correctAnswer ? true : false,
                isSelected: false
            }
        }))
    }, [])

    const select = (answer) => {
        setAnswerState(prevState => prevState.map(obj => {
            return {
                ...obj,
                isSelected: obj.value === answer ? true : false,
            }
        }))
        props.sendData({
            question: props.question,
            selectedAnswer: answer,
            correctAnswer: props.correctAnswer,
        })
    }

    let answerElements = answerState.map(answer => <Answer 
        question={props.question} 
        answer={answer.value} 
        key={answer.value} 
        isSelected={answer.isSelected}
        isCorrect={answer.isCorrect} 
        select={select}
        gameState={props.gameState} />
    )

    return (
        <div className='card-cont'>
            <Question value={props.question} />
            <div className='options-cont'>
                {answerElements}
            </div>
        </div>
    )
}