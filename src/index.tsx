import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import BlackRockApp from "./BlackRockApp";
import ReactDom from 'react-dom/client';

const root = ReactDom.createRoot(document.getElementById("root")!);
root.render(<BlackRockApp/>)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
