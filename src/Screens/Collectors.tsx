import React from 'react';
import PlantCard from "../Components/PlantCard";
import plantList from '../data/plants.json';

const Collectors = () => {

    const listOfTests = plantList.map( data =>
        (
            <PlantCard key={ data.id.toString() } plant={ data } wholesale={ false } showWholesalePrices={ false }/>
        )
    )

    return (
        <div className="row">

            {
                listOfTests
            }

        </div>
    );
};

export default Collectors;
