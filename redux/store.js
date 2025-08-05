import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './slice/userData'

export const store = configureStore({
  reducer: {
    userData: counterReducer,
  },
})