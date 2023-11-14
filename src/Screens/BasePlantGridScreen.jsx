import React, { useEffect, useState } from 'react';
import PlantCardComponent from "../Shared/PlantCardComponent";
import { Col, Row } from "antd";
import { NEW_PLANTS } from "../constants/Constants";
import PropTypes from "prop-types";
import { startGetPlants } from "../services/PlantService";
import { useDispatch } from "react-redux";
import { getPlantsScheme } from "../store/plant/plantSlice";
import { Outlet, useLocation } from 'react-router-dom';
import { getUriNameByPathname } from "../utils/routerUtils";

const NewPlantsScreen = ( { isWholesaleUser } ) => {

    const [ plants, setPlants ] = useState( [] )
    const pathname = useLocation().pathname;
    const [ isLoading, setIsLoading ] = useState( false );
    const dispatch = useDispatch();

    const getPlants = async () => {
        setIsLoading( true );
        const result = await startGetPlants( getUriNameByPathname( pathname ) );
        setPlants( result.plants );
        setIsLoading( false );
        return dispatch( getPlantsScheme( result ) );
    }

    useEffect( () => {
        getPlants().then();
    }, [ pathname ] );

    console.log();

    return (
        <>
            {pathname.includes( 'detail-product' ) ? <Outlet/> :
                <Row gutter={[ 16, 16 ]}>
                    {plants.map( ( plant ) => (
                        <Col key={plant[ '_id' ]} xs={{ span: 21, offset: 1 }} sm={{ span: 21, offset: 1 }}
                             md={{ span: 11, offset: 1 }}
                             lg={{ span: 11, offset: 1 }} xl={{ span: 7, offset: 1 }} xxl={{ span: 5, offset: 1 }}
                        >
                            <PlantCardComponent isLoading={isLoading} plantObj={plant} isWholesaleUser={isWholesaleUser}
                                                screen={NEW_PLANTS}/>
                        </Col>
                    ) )}
                </Row>
            }
        </>
    );
};

NewPlantsScreen.propTypes = {
    isWholesaleUser: PropTypes.bool.isRequired
};
export default NewPlantsScreen;
