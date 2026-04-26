import type { AnswerProps } from "../types"

function Answer(props: AnswerProps) {
    const { question, correctAnswer, selectedAnswer, gameState, updateSelection, answer } = props

    const isSelected = selectedAnswer === answer
    const isCorrect = correctAnswer === answer

    const classesPlay = isSelected ? 'selected' : ''
    const classesCheck = isCorrect ? 'correct' : isSelected ? 'wrong' : 'unselected'

    return (
        <label className={`${gameState === 'check' ? classesCheck : classesPlay} answer-label`} >
            <input 
                type='radio' 
                name={question} 
                value={answer} 
                className='answer-input'
                onChange={() => updateSelection(question, answer)} />
            {answer}
        </label>
    )
}

export default Answer