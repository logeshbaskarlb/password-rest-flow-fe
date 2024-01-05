import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Components/Reducer/UserReducer";

export const store = configureStore({
    reducer:{
        users: UserReducer
    }
})
