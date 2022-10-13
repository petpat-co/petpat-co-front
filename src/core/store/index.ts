import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import { popupSlice } from "../redux/popupSlice";

const rootReducer = combineReducers({
  popup: popupSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
