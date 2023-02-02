import React, { createContext, useContext } from 'react';
import useReducerWithSideEffects, { UpdateWithSideEffect, Update } from 'use-reducer-with-side-effects';
import { getStorageItem, setStorageItem } from 'utils/useLocalStorage';


const AppContext = createContext();

const reducer = (prevState, action) => {
    const { type } = action;
    if (type === SET_TOKEN){
        const { payload: jwtToken } = action;
        const newState = { ...prevState, jwtToken };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("jwtToken", jwtToken);
        });
    } else if ( type === REFRESH_TOKEN){
        const { payload: refreshToken } = action;
        const newState = { ...prevState, refreshToken };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("refreshToken", refreshToken);
        });
    } else if (type === DELETE_TOKEN){
        const newState = { ...prevState, jwtToken: "", refresh: "" };
        return UpdateWithSideEffect(newState, (state, dispatch) => {
            setStorageItem("jwtToken", "");
            setStorageItem("refreshToken", "");
        });
    }

    return prevState;
}

export const AppProvider = ({ children }) => {
    const [store, dispatch] = useReducerWithSideEffects(reducer, null, () => ({
        jwtToken: getStorageItem("jwtToken", ""),
        refreshToken: getStorageItem("refresh", ""),
    }));
    return (
        <AppContext.Provider value={{ store, dispatch }}>
            { children }
        </AppContext.Provider>
    )
}

// 값을 읽어옴.
export const useAppContext = () => {
    return useContext(AppContext);
}


// Actions
const SET_TOKEN = "APP/SET_TOKEN";
const REFRESH_TOKEN = "APP/REFRESH_TOKEN";
const DELETE_TOKEN = "APP/DELETE_TOKEN";

// Actions Creators
export const setToken = token => ({ type: SET_TOKEN, payload: token });
export const refreshToken = token => ({ type: REFRESH_TOKEN, payload: token});
export const deleteToken = () => ({ type: DELETE_TOKEN });