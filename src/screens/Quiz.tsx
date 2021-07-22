import { useEffect, useState } from "react";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import {useParams} from "react-router-dom";
import {getQuiz} from '../features/quizzes/quizSlice';
import {saveResult} from '../features/results/resultSlice';
import {QuizTimer} from "../features/quizzes/QuizTimer";
import { QuestionCard } from "../features/quizzes/QuestionCard";
import {QuizSummary} from "../features/quizzes/QuizSummary";
import { QuestionType } from "../features/quizzes/quizType";

type QuestionResult = {
    question: QuestionType,
    selectedOption: number,
    points: number
}

export default function Quiz(){
    const {activeQuizStatus, activeQuiz} = useSelector((state: RootStateOrAny)=> state.quizzes);
    const {saveResultStatus} = useSelector((state: RootStateOrAny)=> state.results);
    const authState = useSelector((state: RootStateOrAny)=> state.authentication);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizResult, setQuizResult] = useState<QuestionResult[]>([]);
    const [showSummary, setShowSummary] = useState(false);

    const params = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        (async()=>{
            if(activeQuizStatus === "Idle"){
                let quizId = params.quizId;
                await dispatch(getQuiz(quizId));
                // setStartTimer(true);
            }
        })();

    }, [dispatch, activeQuizStatus, params, activeQuiz]);

    // next question
    function updateQuestion(questionData: QuestionResult){
        // console.count('updating question: ');
        if(currentQuestionIndex+1 <= activeQuiz.questions.length){
            setQuizResult(prevData => {
                return [...prevData, questionData]
            });

            // use to show last question even after answering it
            if(currentQuestionIndex+1 < activeQuiz.questions.length){
                setCurrentQuestionIndex(currentQuestionIndex+1);
            }
        }
    }

    async function storeResult(){
        let quizscore = quizResult.reduce((acc, question) => {return acc + question.points}, 0);
        let result = {
            quiz: activeQuiz._id,
            user: authState.userId,
            score: quizscore,
            correctAnswers: quizscore ? quizscore / 10 : 0,
            wrongAnswers: quizscore ? (activeQuiz.questions?.length * activeQuiz.pointsPerQuestion - quizscore) / 10 : 0 
        }

        console.log('result: ', result);
        await dispatch(saveResult(result));

        // show summary
        setShowSummary(true);
    }

    return(
        <>
            <div className="displayFlex itemsCenter justifyBetween mt4 mb4">
                <h3 className="">{activeQuiz.name}</h3>

                {
                    quizResult.length < activeQuiz.questions?.length &&
                    <h4 className="">
                        00 : <QuizTimer updateQuestion={updateQuestion} key={currentQuestionIndex} seconds={60} />
                    </h4>
                }
            </div>

            {
                !showSummary &&
                <div className="">
                    <div className="displayFlex itemsCenter justifyBetween mb8">
                        <h5 className="textSm textGray4">Question {currentQuestionIndex < 10 ? `0${currentQuestionIndex+1}`: currentQuestionIndex}</h5>
                        <h5 className=" textSm textGray4">Score: {quizResult.reduce((acc, question) => {return acc + question.points}, 0)} / {activeQuiz.questions?.length * activeQuiz.pointsPerQuestion}</h5>
                    </div>
                    {
                        activeQuiz.questions && (currentQuestionIndex < activeQuiz.questions?.length) &&
                        <QuestionCard updateQuestion={updateQuestion} questionData={activeQuiz.questions[currentQuestionIndex]} />
                    }

                    {
                        currentQuestionIndex+1 >= activeQuiz.questions?.length &&
                        <div className="mt8 mb4" style={{textAlign:"right"}}>
                            <button className="btn-primary" 
                                    disabled={(quizResult.length !== activeQuiz.questions.length) || saveResultStatus === "Loading"} 
                                    onClick={storeResult}>
                                Save Results
                            </button>
                        </div>
                    }
                </div>
            }

            {
                showSummary && quizResult.length === activeQuiz.questions?.length ?
                <QuizSummary resultOfQuiz={quizResult}/>
                :
                null
            }
        </>
    )
}
