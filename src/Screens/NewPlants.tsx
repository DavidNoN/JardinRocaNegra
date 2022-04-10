import React from 'react';
import plantList from "../data/plants.json";
import PlantCard from "../Components/PlantCard";
import Cover from "../Components/Cover";


const NewPlants = () => {

    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
    let dateDiffInDays = ( a: Date, b: Date ): number => {
        // Discard the time and time-zone information.
        const utc1 = Date.UTC( a.getFullYear(), a.getMonth(), a.getDate() );
        const utc2 = Date.UTC( b.getFullYear(), b.getMonth(), b.getDate() );

        return Math.floor( ( utc2 - utc1 ) / _MS_PER_DAY );
    }

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
