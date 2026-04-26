import type { LandingProps } from "../types"

function Landing(props: LandingProps) {
    const { startGame } = props

    return (
        <div className='landing-cont'>
            <h1>Quizzical</h1>
            <h2>Test your trivia knowledge</h2>
            <button className='btn' onClick={startGame}>Start quiz</button>
        </div>
    )
}

export default Landing