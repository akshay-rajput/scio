import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import {QuizType} from '../features/quizzes/quizType';
import { QuizCard } from '../features/quizzes/QuizCard';
import {ImSpinner8} from "react-icons/im";

export default function Home() {
    const quizState = useSelector((state: RootStateOrAny) => state.quizzes);
    
    return (
        <div>
            <h3 className="fontBold textGray4 mb4">Take Quiz</h3>
            {
                quizState.status === "Fulfilled" && 
                quizState.allQuizzes?.map((quiz: QuizType) => {
                    return(
                        <QuizCard key={quiz._id} quizData={quiz} />
                    )
                })
            }

            {
                quizState.status === "Loading" &&
                <div className="displayFlex flexCol itemsCenter mt12 mb12 pt12 pb12">
                    <ImSpinner8 className="textOrange4 textLg loading-icon" />
                </div>
            }
        </div>
    )
}
