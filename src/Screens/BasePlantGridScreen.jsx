import React, { useEffect, useState } from 'react';
import PlantCardComponent from "../Shared/PlantCardComponent";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from 'react-router-dom';
import { getUriNameByPathname } from "../utils/routerUtils";
import EmptyComponent from "../Shared/EmptyComponent";
import { getPlantsThunk } from "../store/plant/plantThunks";
import { checkSelectorScreenPlant, validateIfNeedToReloadPlants } from "../utils/PlantCardUtils";

const BasePlantGridScreen = ( { isWholesaleUser, screenName } ) => {


    const pathname = useLocation().pathname;
    const [ isLoading, setIsLoading ] = useState( false );
    const dispatch = useDispatch();

    const { newPlants, wholesalePlants, collectionPlants, carnivorousPlants } = useSelector( state => state.plants );
    const plants = checkSelectorScreenPlant( newPlants, wholesalePlants, collectionPlants, carnivorousPlants, screenName );

    const getPlants = async () => {
        if (!validateIfNeedToReloadPlants(newPlants, wholesalePlants, collectionPlants, carnivorousPlants, screenName)) {
            return;
        }
        setIsLoading( true );
        await getPlantsThunk( dispatch, getUriNameByPathname( pathname ) );
        return setIsLoading( false );
    }

    useEffect( () => {
        getPlants().then();
    }, [ pathname, screenName ] );


    return (
        <>
            {pathname.includes( 'detail-product' ) ? <Outlet/> :
                <Row gutter={[ 16, 16 ]}>
                    {(!plants || plants.length === 0) ? <EmptyComponent/> : plants.map( ( plant ) => (
                        <Col key={plant[ '_id' ]} xs={{ span: 21, offset: 1 }} sm={{ span: 21, offset: 1 }}
                             md={{ span: 11, offset: 1 }}
                             lg={{ span: 11, offset: 1 }} xl={{ span: 7, offset: 1 }} xxl={{ span: 5, offset: 1 }}
                        >
                            <PlantCardComponent isLoading={isLoading} plantObj={plant} isWholesaleUser={isWholesaleUser}
                                                screen={screenName}/>
                        </Col>
                    ) )}
                </Row>
            }
        </>
    );
};

BasePlantGridScreen.propTypes = {
    screenName: PropTypes.string.isRequired,
    isWholesaleUser: PropTypes.bool.isRequired
};
export default BasePlantGridScreen;
