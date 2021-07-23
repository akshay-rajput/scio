import React, {useState, useEffect} from 'react';
import {QuestionType} from './quizType';
import styled from "styled-components";

const OptionCard = styled.button`
    border-radius: var(--border-radius);
    border: 1px solid var(--primary);
    padding: 1rem;

    &.correct-option{
        background: #bbf7d0;
    }

    &.wrong-option{
        background: salmon;
        color: white;
    }
`;

type QuestionProps = {
    updateQuestion: Function,
    questionData: QuestionType
}

export const QuestionCard: React.FC<QuestionProps> = ({updateQuestion, questionData}) => {
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        console.log('rerendered..')
        return () => {
            setSelectedOption(0);
        }
    }, [questionData]);

    function chooseOption(index: number){
        if(!selectedOption){
            setSelectedOption(index+1);
            
            let questionInfo = {
                question: questionData,
                selectedOption: index+1,
                points: index+1 === questionData.correctOption ? 10 : 0
            }

            setTimeout(() => {
                updateQuestion(questionInfo);
            }, 1000);
        }
    }

    function checkOption(optionIndex: number){
        // console.log('selected: ', selectedOption + " -- option: ", optionIndex+1);
        if(selectedOption){
            if(optionIndex+1 === questionData.correctOption){
                return "correct-option";
            }
            if((selectedOption === optionIndex+1) && (optionIndex+1 !== questionData.correctOption)){
                return "wrong-option";
            }
        }
    }

    return (
        <>
            <h4>{questionData.questionText}</h4>

            <div className="mt4 mb4 displayGrid gridCols2 gridGap4">
            {
                questionData.options.map((option, index)=> {
                    return(
                        <OptionCard key={option._id}
                            className={`cursorPointer textSm md:textRg ${checkOption(index)}`} 
                            onClick={()=> chooseOption(index)}>
                            {option.optionText}
                        </OptionCard>
                    )
                })
            }
            </div>
        </>
    )
}
