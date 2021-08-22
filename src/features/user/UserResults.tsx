import React from 'react'
import styled from 'styled-components';
import { ResultType } from './resultType';
import { formatDistanceToNow } from 'date-fns';

const Result = styled.div`
    justify-content: space-between;
    border: 1px solid var(--light);
    border-radius: var(--border-radius);
    background: var(--card-bg);

    label{
        font-size: 0.65rem;
    }

    @media(max-width: 480px){
        justify-content: space-between;

        div:first-child{
            width: 100%;
        }

    }
`;

type ResultCardProps = {
    result: ResultType
}

export const UserResults: React.FC<ResultCardProps> = ({result}) => {
    return (
        <Result className="p4 displayFlex flexWrap gridGap4 mb4">

            <div className="displayFlex flexCol">
                <label className="textGray4 mb2">Quiz name</label>
                <h4>{result.quiz.name}</h4>
            </div>

            <div className="displayFlex flexCol textCenter">
                <label className="textGray4 mb2">Correct Answers</label>
                <h4>{result.correctAnswers}</h4>
            </div>

            <div className="displayFlex flexCol textCenter">
                <label className="textGray4 mb2">Wrong Answers</label>
                <h4>{result.wrongAnswers}</h4>
            </div>

            <div className="displayFlex flexCol textCenter">
                <label className="textGray4 mb2">Score</label>
                <h4>{result.score}</h4>
            </div>

            <div className="displayFlex flexCol textCenter">
                <label className="textGray4 mb2">Date</label>
                <h4>{formatDistanceToNow(new Date(result.createdAt)) + " ago"}</h4>
            </div>
        </Result>
    )
}
