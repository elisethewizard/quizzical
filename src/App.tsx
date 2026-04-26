import { useState, type FormEvent } from 'react'
import Landing from './components/Landing'
import Card from './components/Card'
import type { GameState, QuizItem } from './types'
import { decode } from 'html-entities'

function App() {
    const [dataState, setDataState] = useState<QuizItem[]>([])
    const [gameState, setGameState] = useState<GameState>('land')
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<any>(null)

    function startGame() {
        if (score) {
            setScore(0)
        }
        setDataState([])
        loadData()
        setGameState('play')
    }

    async function loadData() {
        setLoading(true)
        try {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
            const data = await res.json()
            if (data.response_code !== 0) {
                setError(`Fetch returned with response code ${data.response_code}.`)
                return
            }
            const decodedData: QuizItem[] = data.results.map((item: any) => {
                return {
                    question: decode(item.question),
                    answers: shuffle([...item.incorrect_answers, item.correct_answer].map(answer => decode(answer))),
                    correctAnswer: decode(item.correct_answer)
                }
            })
            setDataState(decodedData)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    
    }

    function shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array
    }

    function updateSelection(q: string, a: string) {
        if (gameState === 'check') {
            return
        }
        setDataState(prev => prev.map(i => {
            return i.question === q ? {
                ...i,
                selectedAnswer: a
            } : i
        }))
    }

    function checkAnswers(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const selectIsDone = dataState.every(item => item.selectedAnswer)
        if (selectIsDone || gameState === 'play-unfinished') {
            let scoreThisRound: number = 0
            dataState.forEach(i => {
                if (i.selectedAnswer === i.correctAnswer) {
                    scoreThisRound++
                }
            })
            setScore(scoreThisRound)
            setGameState('check')
        } else {
            setGameState('play-unfinished')
        }
    }

    if ((loading) || (gameState !=='land' && !dataState.length)) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <>
            <h1>Something went wrong.</h1>
            <p>Error message: {error}</p>
        </>
    }

    if (gameState === 'land') {
        return <Landing startGame={startGame} />
    }

    function Result() {
        switch (gameState) {
            case 'play':
                return (
                    <button className='btn check-btn'>Check answers</button>
                )
            case 'play-unfinished':
                return (
                    <>
                        <h1 className='unfinished-text'>Some quiestions have no answer selected.</h1>
                        <button className='btn check-btn'>Check anyway</button>
                    </>
                )
            case 'check':
                return (
                    <>
                        <h1 className='replay-text'>You scored {score}/{dataState.length} correct answers</h1>
                        <button className='btn replay-btn' type='button' onClick={startGame}>Play again</button>
                    </>
                )
            default:
                setError(`Result component function called while gameState is landing. This should never happen.`)
                break;
        }
    }

    return (
        <form onSubmit={checkAnswers}>

            {
                dataState.map(i => <Card
                    {...i}
                    gameState={gameState}
                    updateSelection={updateSelection}
                    key={i.question}
                />)
            }

            <div className='result-check-cont'>
                <Result />
            </div>

        </form>
    )
}

export default App