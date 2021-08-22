import React from 'react';
// import {QuestionType} from './quizType';

type summaryProps = {
    resultOfQuiz: any[]
}
export const QuizSummary: React.FC<summaryProps> = ({resultOfQuiz}) => {
    return (
        <>
        <h4 className="mb4">Summary</h4>
            
            {
                resultOfQuiz.map(result => {
                    return(
                        <div key={result.question._id} className={`border rounded p2 mb4 ${result.points ? "bgGreen2 borderGreen4": "bgRed2 borderRed4"}`}>
                            <h4 className="mb2">{result.question.questionText}</h4>
                            {
                                result.question.options[result.selectedOption - 1] ?
                                <p className="textSm">You answered: <span className="fontSemiBold">{result.question.options[result.selectedOption - 1].optionText}</span></p>
                                :
                                <p className="textSm">You didn't answer</p>
                            }
                            {
                                result.points ?
                                <p className="textSm pt1">
                                    You were right!
                                </p>:
                                <p className="textSm pt1">Correct answer: <span className="fontSemiBold">{result.question.options[result.question.correctOption - 1].optionText}</span></p>
                            }
                        </div>
                    )
                })
            }
        </>
    )
}
