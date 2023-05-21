import { createReducer } from "@reduxjs/toolkit";
import actionUser from './Actions'

const { oneUser } = actionUser

const initialState ={
    user: ''
}

const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(oneUser.fulfilled, (state, action) => {
            action.payload.oneUser = action.payload.oneUser
            let newState = {
                ...state,
                user: action.payload.user
            };
            return newState;
        })
});

export default userReducer