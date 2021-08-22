import React, { useState, useEffect } from 'react';
import {QuestionType} from './quizType';

type QuizTimerProps = {
    // startTimer: boolean,
    updateQuestion: Function,
    seconds: number,
    currentQuestion: QuestionType
}
export const QuizTimer: React.FC<QuizTimerProps> = ({ seconds, updateQuestion, currentQuestion }) => {

    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        // exit early when we reach 0 and timer is still set to on
        if (!timeLeft) {

            let questionInfo = {
                question: currentQuestion,
                selectedOption: 0,
                points: 0
            }
            updateQuestion(questionInfo);
            return;
        }

        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);

    }, [timeLeft, updateQuestion, currentQuestion]);

    return (
        <>
            {
                timeLeft < 10 ? `0${timeLeft}` : timeLeft
            }
        </>
    )
}
