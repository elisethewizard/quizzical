import React from 'react'

export default function Answer(props){
    const classesStart = props.isSelected ? 'selected' : ''
    const classesCheck = props.isCorrect ? 'correct' : props.isSelected ? 'wrong' : 'faded'
    return (
        <label className={`${props.gameState === 'check' ? classesCheck : classesStart} answer-label`} key={props.answer}>
            <input 
                type='radio' 
                name={props.question} 
                value={props.answer} 
                className='answer-input'
                onChange={(e) => props.select(e.target.value)} />
            {props.answer}
      </label>
    )
}