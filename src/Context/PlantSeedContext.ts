import plantList from '../data/plants.json';
import React from "react";

let setPlantList: any;
const PlantSeedContext = React.createContext([plantList, setPlantList]);


export default PlantSeedContext;
