import React from 'react';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { ConfigProvider } from "antd";
import BaseScreen from "./Screens/BaseScreen";

const BlackRockApp = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true }}>
            <ConfigProvider theme={{ token: { colorPrimary: '#FFFFFF' } }}>
                <BaseScreen/>
            </ConfigProvider>
        </BrowserRouter>

    );
};

export default BlackRockApp;

