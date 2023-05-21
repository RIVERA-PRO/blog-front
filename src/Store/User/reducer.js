import { createReducer } from "@reduxjs/toolkit";
import verify_account from "./actions"
const initialState = {
    user: [],
    message: ""
};

const verifyReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(verify_account.fulfilled, (state, action) => {
            let newState = {
                ...state,
                user: action.payload.response.user,
                message: action.payload.message
            }
            return newState
        })

        .addCase(verify_account.rejected, (state, action) => {
            let newState = {
                ...state,
                message: "error"
            }
            return newState
        })
})


export default verifyReducer