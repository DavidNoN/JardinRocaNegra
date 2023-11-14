import {configureStore} from '@reduxjs/toolkit';
import { authSlice } from "./auth/authSlice";
import { plantSlice } from "./plant/plantSlice";
import { screenBrowserHistorySlice } from "./screen/screenBrowserHistorySlice";


export const store = configureStore({
    reducer: {
        user: authSlice.reducer,
        plants: plantSlice.reducer,
        screen: screenBrowserHistorySlice.reducer
    }
})
