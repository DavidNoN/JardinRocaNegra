import React, {useState} from 'react';
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import NewPlants from "./Screens/NewPlants";
import Wholesale from "./Screens/Wholesale";
import Seeds from "./Screens/Seeds";
import Collectors from "./Screens/Collectors";
import './index.css'
import DetailProduct from "./Screens/DetailProduct";
import plantList from './data/plants.json';
import PlantSeedContext from './Context/PlantSeedContext'

const BlackRockApp = () => {

    const [plantSeedList, setPlantSeedList] = useState(plantList);

    return (
        <PlantSeedContext.Provider value={[plantSeedList, setPlantSeedList]}>
            <HashRouter>
                <Navbar/>
                <main className="flex-shrink-0 mb-5 bg-grey pt-10">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Navigate to="/plants-available"/>}/>
                            <Route
                                path="*"
                                element={
                                    <Navigate to="/plants-available"/>
                                }
                            />

                            <Route path="plants-available" element={<Collectors/>}/>
                            <Route path="wholesale" element={<Wholesale/>}/>
                            <Route path="new-plants" element={<NewPlants/>}/>
                            <Route path="seeds" element={<Seeds/>}/>
                            <Route path="detail-plant/:plantId" element={<DetailProduct/>}/>

                        </Routes>
                    </div>
                </main>
                <Footer/>
            </HashRouter>
        </PlantSeedContext.Provider>
    );
};

export default BlackRockApp;
