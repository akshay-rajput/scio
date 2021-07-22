import React from 'react';
import { formatDistanceToNow } from 'date-fns';

type resultProps = {
    result: { user: { avatarUrl: string; name: string; }; correctAnswers: number; wrongAnswers: number; quiz: { pointsPerQuestion: number; }; createdAt: string | Date; }
}

export const ResultCard: React.FC<resultProps> = ({result}) => {
    return (
        <>
            <div className="mt4 mb4 displayGrid gridCols7 itemsCenter gridGap2">
                <div className="gridColSpan2 itemsCenter displayFlex gridGap2">
                    <img src={result.user.avatarUrl} alt="user" className="h6 roundedFull border borderWhite" />
                    <h4 className="">{result.user.name}</h4>
                </div>
                <p className="">{result.correctAnswers}</p>
                <p className="">{result.wrongAnswers}</p>
                <p className="">{result.correctAnswers * result.quiz.pointsPerQuestion}</p>
                <p className="gridColSpan2 textXs md:textSm">{formatDistanceToNow(new Date(result.createdAt)) + " ago"}</p>
            </div>    
        </>
    )
}
