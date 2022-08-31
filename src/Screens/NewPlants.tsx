import React, {useContext} from 'react';

import PlantCard from "../Components/PlantCard";
import Cover from "../Components/Cover";
import { dateDiffInDays } from "../Utils/CalcDiffDays";
import PlantSeedContext from "../Context/PlantSeedContext";
import {IPlant} from "../Interfaces/IPlant";


const NewPlants = () => {

    const [plantList] = useContext(PlantSeedContext)

    const calcLastWeekPublished = ( date: string ): boolean => {
        const plantDate = new Date( date );
        const currentDate = new Date();
        const diffDays = dateDiffInDays( plantDate, currentDate );
        return diffDays <= 7;
    }

    const listOfTests = plantList.map( (data : IPlant) =>
        (
            calcLastWeekPublished( data.publishDate ) &&
            <PlantCard key={ data.id.toString() } plant={ data } wholesale={ false } showWholesalePrices={ false }/>
        )
    )

    return (
        <div className="container">

            <Cover/>

            <div className="row">

                {
                    listOfTests
                }

            </div>
        </div>
    );
};

export default NewPlants;
