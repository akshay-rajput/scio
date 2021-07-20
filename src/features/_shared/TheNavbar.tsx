import React from 'react'
import {NavLink, Link} from "react-router-dom";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {LOGOUT} from '../authentication/authenticationSlice';
import {AiOutlineHome,AiOutlineBarChart, AiOutlineUser, AiOutlineLogout} from 'react-icons/ai';
import {GiUbisoftSun} from 'react-icons/gi';
import styled from 'styled-components';

const AppNav = styled.nav`
    a{
        color: var(--gray-light) !important;
        font-size: 1.5rem;
        padding: 0.1rem;

        &:hover, &.app-logo{
            color:var(--primary) !important;
            text-decoration: none;
        }

        img{
            height: 1.5rem;
            border-radius: 50%;
            padding: 0.1rem;
            background: var(--black);
        }
    }
    a.active{
        color: var(--primary) !important;
        background: var(--dark);
    }
    button{
        color: var(--gray-light) !important;
        font-size: 1.35rem;
        padding: 0.1rem;

        &:hover{
            color: var(--primary) !important;
        }
    }
`;

export default function TheNavbar() {
    const authState = useSelector((state: RootStateOrAny) => state.authentication);
    const dispatch = useDispatch();

    // logout
    async function logout(){
        console.log('loggin out');
        // dispatch logout
        await dispatch(LOGOUT());
    }

    return (
        <AppNav >
            <div className="app-container displayFlex justifyBetween itemsCenter p1">
                <Link to="/" className="app-logo displayFlex itemsCenter">
                    <GiUbisoftSun className="mr1"/>
                    Scio
                </Link>

                <ul className=" displayFlex listNoStyle gridGap4 itemsCenter">
                    <li>
                        <NavLink to="/" className="displayFlex itemsCenter" title="Home">
                            <AiOutlineHome />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/leaderboard" className="displayFlex itemsCenter" title="View Leaderboard">
                            <AiOutlineBarChart />
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to={"/profile/"+authState.userId} className="displayFlex itemsCenter" title="View Profile">
                            <AiOutlineUser />
                        </NavLink>
                    </li>

                    <li>
                        <button type="button" onClick={logout} className=" displayFlex itemsCenter bgTransparent borderNone" title="Logout">
                            <AiOutlineLogout />
                        </button>
                    </li>

                </ul>
            </div>
            
        </AppNav>
    )
}
