type GameState = 'land' | 'play' | 'play-unfinished' | 'check'

type QuizItem = {
    question: string,
    answers: string[],
    correctAnswer: string,
    selectedAnswer?: string,
}

type LandingProps = {
    startGame: () => void,
}

interface CardProps extends QuizItem {
    gameState: GameState,
    updateSelection: (q: string, a: string) => void,
}

interface AnswerProps extends Omit<CardProps, 'answers'> {
    answer: string,
}

export type { GameState, QuizItem, LandingProps, CardProps, AnswerProps }