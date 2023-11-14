import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { ConfigProvider } from "antd";
import BaseScreen from "./Screens/BaseScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";


const BlackRockApp = () => {
    return (
        <Provider store={store}>
            <BrowserRouter future={{ v7_startTransition: true }}>
                <ConfigProvider theme={{ token: { colorPrimary: '#FFFFFF' } }}>
                    <BaseScreen/>
                </ConfigProvider>
            </BrowserRouter>
        </Provider>

    );
};

export default BlackRockApp;

