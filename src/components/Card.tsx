import Answer from "./Answer"
import type { CardProps } from "../types"

function Card(props: CardProps){
    return (
        <div className="card-cont">
            <h1 className='question'>
                {props.question}
            </h1>
            <div className="options-cont">
                {props.answers.map(item => <Answer
                    {...props}
                    answer={item}
                    key={item} 
                />)}
            </div>
        </div>
    )
}

export default Card