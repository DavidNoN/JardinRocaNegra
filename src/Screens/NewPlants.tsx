import React from 'react';
import plantList from "../data/plants.json";
import PlantCard from "../Components/PlantCard";
import Cover from "../Components/Cover";
import { dateDiffInDays } from "../Utils/CalcDiffDays";


const NewPlants = () => {

    const calcLastWeekPublished = ( date: string ): boolean => {
        const plantDate = new Date( date );
        const currentDate = new Date();
        const diffDays = dateDiffInDays( plantDate, currentDate );
        return diffDays <= 7;
    }

    const listOfTests = plantList.map( data =>
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
