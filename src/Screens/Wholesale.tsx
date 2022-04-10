import React, { ChangeEvent, ChangeEventHandler, useState } from 'react';
import plantList from "../data/plants.json";
import PlantCard from "../Components/PlantCard";
import { GiKey } from "react-icons/gi";

const Wholesale = () => {

    const [ showPrices, setShowPrices ] = useState( false );

    const listOfTests = plantList.map( data =>
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
                           placeholder="Recipient's username"
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
