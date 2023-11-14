import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    screenName: '',
    browserHistory: []
};


export const screenBrowserHistorySlice = createSlice( {
    name: 'screen',
    initialState,
    reducers: {
        setScreenName: ( state, { payload } ) => {
            state.screenName = payload.screenName;
        },
        setBrowserHistory: (state, { payload }) => {
            state.browserHistory = payload.browserHistory
        },
    }
} );

export const { setScreenName, setBrowserHistory } = screenBrowserHistorySlice.actions
