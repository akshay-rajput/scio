import {QuizType} from '../quizzes/quizType';

export type ResultType = {
    _id: string,
    quiz: QuizType,
    user: {
        _id: string,
        name: string,
        avatarUrl: string
    },
    correctAnswers: number,
    wrongAnswers: number,
    score: number,
    createdAt: Date
}