export type OptionsType = {
    _id: string,
    optionText: string,
}

export type QuestionType = {
    _id: string,
    questionText: string,
    options: Array<OptionsType>,
    correctOption: number
}

export type QuizType = {
    _id: string,
    name: string,
    description: string,
    totalPoints: number,
    pointsPerQuestion: number,
    questions: Array<QuestionType>
}