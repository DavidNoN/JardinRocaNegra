import React, {ChangeEvent, useContext, useState} from 'react';
import PlantCard from "../Components/PlantCard";
import { GiKey } from "react-icons/gi";
import PlantSeedContext from "../Context/PlantSeedContext";
import {IPlant} from "../Interfaces/IPlant";

const Wholesale = () => {

    const [plantList] = useContext(PlantSeedContext)

    const [ showPrices, setShowPrices ] = useState( false );

    const listOfTests = plantList.map( (data : IPlant) =>
        (
            data.wholesale &&
            <PlantCard key={ data.id.toString() } plant={ data } wholesale={ true } showWholesalePrices={ showPrices }/>
        )
    )

    const validateKeyWholesale = ( { target: { value } }: ChangeEvent<HTMLInputElement> ) => {
        if ( value === '1135624' ) {
            setShowPrices( true );
        } else {
            setShowPrices( false );
        }
    }

    return (
        <div>

            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={ validateKeyWholesale }
                           placeholder="Introduce el Código"
                           aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <span className="input-group-text c-pointer" id="basic-addon2"> <GiKey size="24"/> </span>
                </div>
            </div>

            <div className="row">

                {
                    listOfTests
                }

            </div>
        </div>
    )
};

export default Wholesale;
