import React from 'react';
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import NewPlants from "./Screens/NewPlants";
import Wholesale from "./Screens/Wholesale";
import Seeds from "./Screens/Seeds";
import Collectors from "./Screens/Collectors";
import './index.css'
import DetailProduct from "./Screens/DetailProduct";

const BlackRockApp = () => {
    return (
        <HashRouter>
            <Navbar/>
            <main className="flex-shrink-0 mb-5 bg-grey pt-10">
                <div className="container">
                    <Routes>
                        <Route path="/" element={ <Navigate to="/new-plants"/> }/>
                        <Route
                            path="*"
                            element={
                                <Navigate to="/new-plants"/>
                            }
                        />
                        <Route path="plants-available" element={ <Collectors/> }/>
                        <Route path="wholesale" element={ <Wholesale/> }/>
                        <Route path="new-plants" element={ <NewPlants/> }/>
                        <Route path="seeds" element={ <Seeds/> }/>
                        <Route path="detail-plant/:plantId" element={ <DetailProduct/> }/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </HashRouter>
    );
};

export default BlackRockApp;
