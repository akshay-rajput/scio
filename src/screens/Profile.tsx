import React, {useEffect} from 'react';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import {getUserData} from "../features/user/userSlice";
import {UserResults} from '../features/user/UserResults';
import {ImSpinner8} from 'react-icons/im';

export default function Profile() {
    const userState = useSelector((state: RootStateOrAny)=> state.user);
    const authState = useSelector((state: RootStateOrAny)=> state.authentication);

    const dispatch = useDispatch();

    useEffect(() => {
        if(userState.status === "Idle"){
            dispatch(getUserData(authState.userId));
        }
        
    }, [dispatch, userState.status, authState.userId]);

    return (
        <>
            <div className="displayFlex pt2 pb2 mb2 flexCol itemsCenter">
                <img src={authState.userAvatar} alt="User Avatar" className="h24 w24 roundedFull p1 bgWhite" />
                <h3 className="pt2">{authState.name}</h3>
            </div>

            <hr className="border borderOrange2" />

            {
                userState.status === "Loading" && 
                <div className="displayFlex flexCol pt12 pb12 itemsCenter">
                    <ImSpinner8 className="loading-icon textLg textOrange4" />
                </div>
            }
            {
                userState.status === "Fulfilled" &&
                <div className="mt4 mb4">
                    <h4 className="mb4">Previous Results</h4>
                    {
                        userState.userResults?.length > 0 ?
                        userState.userResults.map((result: any) => {
                            return(
                                <UserResults key={result._id} result={result} />
                            )
                        })
                        :
                        <div className="textGray4 textSm displayFlex justifyCenter rounded pt12 pb12 border borderOrange2">When you take a quiz, the results appear here.</div>
                        
                    }
                </div>
            }
        </>
    )
}
