import React, {useEffect} from 'react';
import {useDispatch, useSelector, RootStateOrAny} from "react-redux";
import {getResults} from "../features/results/resultSlice";
import {ResultCard} from "../features/results/ResultCard";

export default function Leaderboard() {
    const resultsState = useSelector((state: RootStateOrAny)=> state.results);

    const dispatch = useDispatch();

    useEffect(() => {
        if(resultsState.status === "Idle"){
            dispatch(getResults());
        }        
    }, [dispatch, resultsState.status]);

    return (
        <>
            <h2 className="textMd">Leaderboard</h2>

            <div className="mt4 mb4">
                {
                    resultsState.allResults["General Knowledge"]?.length > 0 &&
                    <div className="rounded border borderOrange2 bgWhite p2">
                        <h4 className="">General Knowledge</h4>

                        <div className="displayGrid gridCols7 gridGap2 textXs mt4">
                            <label className="gridColSpan2" >User</label>
                            <label >Correct</label>
                            <label >Wrong</label>
                            <label >Total Points</label>
                            <label className="gridColSpan2">Date</label>
                        </div>
                        {
                            resultsState.allResults["General Knowledge"].slice()
                            .sort((res: { correctAnswers: number; }, nextRes: { correctAnswers: number; }) => nextRes.correctAnswers - res.correctAnswers)
                            .map((result: any) => {
                                return (
                                    <ResultCard key={result._id} result={result}/>
                                )
                            })
                        }
                    </div>
                }

                {
                    resultsState.allResults["Sports Quiz"]?.length > 0 &&
                    <div className="rounded border borderOrange2 bgWhite p2 mt8 mb8">
                        <h4 className="">Sports Quiz</h4>

                        <div className="displayGrid gridCols7 gridGap2 textXs mt4">
                            <label className="gridColSpan2" >User</label>
                            <label >Correct</label>
                            <label >Wrong</label>
                            <label >Total Points</label>
                            <label className="gridColSpan2">Date</label>
                        </div>
                        {
                            resultsState.allResults["Sports Quiz"].slice()
                            .sort((res: { correctAnswers: number; }, nextRes: { correctAnswers: number; }) => nextRes.correctAnswers - res.correctAnswers)
                            .map((result: any) => {
                                return (
                                    <ResultCard key={result._id} result={result}/>
                                )
                            })
                        }
                    </div>
                }

                {
                    resultsState.allResults["English Language Quiz"]?.length > 0 &&
                    <div className="rounded border borderOrange2 bgWhite p2 mt8 mb8">
                        <h4 className="">English Language Quiz</h4>

                        <div className="displayGrid gridCols7 gridGap2 textXs mt4">
                            <label className="gridColSpan2" >User</label>
                            <label >Correct</label>
                            <label >Wrong</label>
                            <label >Total Points</label>
                            <label className="gridColSpan2">Date</label>
                        </div>
                        {
                            resultsState.allResults["English Language Quiz"].slice()
                            .sort((res: { correctAnswers: number; }, nextRes: { correctAnswers: number; }) => nextRes.correctAnswers - res.correctAnswers)
                            .map((result: any) => {
                                return (
                                    <ResultCard key={result._id} result={result}/>
                                )
                            })
                        }
                    </div>
                }
            </div>

        </>
    )
}
