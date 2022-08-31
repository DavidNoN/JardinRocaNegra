import React, {useContext} from 'react';
import PlantCard from "../Components/PlantCard";
import PlantSeedContext from "../Context/PlantSeedContext";
import {IPlant} from "../Interfaces/IPlant";


const Collectors = () => {

    const [plantList] = useContext(PlantSeedContext)

    const listOfTests = plantList.map((data: IPlant) =>
        (
            <PlantCard key={data.id.toString()} plant={data} wholesale={false} showWholesalePrices={false}/>
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
