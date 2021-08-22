import React from 'react';
import { QuizType } from './quizType';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setActiveQuiz} from "./quizSlice";

const QuizInfoCard = styled.div`
    border: 1px solid var(--light);
    background: var(--card-bg);
    border-radius: var(--border-radius);
    min-height: 4rem;

    div:first-child{
        border-radius: var(--border-radius) 0 0 var(--border-radius);
    }
    div.quiz-info{
        border-radius: 0 var(--border-radius) 0 var(--border-radius);
    }
`;

type QuestionCardProps = {
    quizData: QuizType
}

// export default function QuizCard({name, description, totalPoints, pointsPerQuestion }: QuizType){
export const QuizCard: React.FC<QuestionCardProps> = ({ quizData }) => {
    const dispatch = useDispatch();

    function startQuiz(quiz: QuizType){
        dispatch(setActiveQuiz(quiz));
    }

    return (
        <QuizInfoCard className="displayGrid gridCols12 mb4">
            <div className={quizData.name === "General Knowledge" ? "gridColSpan3 teal-gradient" : quizData.name === "Sports Quiz" ? "blue-gradient gridColSpan3" : "orange-gradient gridColSpan3"}></div>

            <div className="gridColSpan9 quiz-info p2">
                <Link to={"/quiz/" + quizData._id} className="app-logo">{quizData.name}</Link>

                <p className="pt2 pb2 textXs textGray4">{quizData.description}</p>

                <div className="displayFlex justifyBetween textGray4 mt2 mb2" style={{ alignItems: "flex-end" }}>
                    <div className="displayFlex flexCol gridGap2">
                        <small className="textXs">Max Points: {quizData.pointsPerQuestion * quizData.questions.length}</small>
                        <small className="textXs">Total Questions: {quizData.questions.length}</small>
                    </div>

                    <Link to={"/quiz/" + quizData._id} onClick={() => startQuiz(quizData)} className="link-button pt2 pb2 pl4 pr4 bgOrange1 hover:bgViolet4 hover:textWhite hover:borderViolet5 textOrange4 border borderOrange4 rounded">Start Quiz</Link>
                </div>
            </div>
        </QuizInfoCard>
    )
}
