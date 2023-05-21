import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../../src/Store/Alert/reducer";
import UserVerifi from "../../src/Store/User/reducer"
import userReducer from "./GetUser/Reducer";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
    user: UserVerifi,
    getUser: userReducer

  },
});
