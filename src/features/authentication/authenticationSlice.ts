import { createSlice } from '@reduxjs/toolkit';

// const localToken = localStorage.getItem('token') ? localStorage.getItem('token') : ""; 
// const localName = localStorage.getItem('name') ? localStorage.getItem('name') : ""; 
// const localUserId = localStorage.getItem('userId') ? localStorage.getItem('userId') : ""; 
// const localAvatar = localStorage.getItem('userAvatar') ? localStorage.getItem('userAvatar') : ""; 
const localToken = JSON.parse(String(localStorage.getItem('token')) || "");
const localName = JSON.parse(String(localStorage.getItem('name')) || "");
const localUserId = JSON.parse(String(localStorage.getItem('userId')) || "");
const localAvatar = JSON.parse(String(localStorage.getItem('userAvatar')) || "");

const userInfo = {
    userId: localUserId ? localUserId : "",
    name: localName ? localName: "",
    token: localToken ? localToken : "",
    userAvatar: localAvatar ? localAvatar : ""
}
// console.log('userInfo: ', userInfo);

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState : userInfo,
    reducers: {
        LOGIN: (state, action) => {
            console.log('login: ', action);
            state.userId = action.payload.id;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.userAvatar = action.payload.avatarUrl;
        },
        LOGOUT: state => {
            // console.log('logoutAction..')
            localStorage.clear();
            // localStorage.setItem('userId', "");
            // localStorage.setItem('name', "");
            // localStorage.setItem('token', "");
            // localStorage.setItem('userAvatar', "");

            // reset
            state.userId = "";
            state.name = "";
            state.token = "";
            state.userAvatar = "";
        },
    }
})

export const { LOGIN, LOGOUT } = authenticationSlice.actions;

export default authenticationSlice.reducer;