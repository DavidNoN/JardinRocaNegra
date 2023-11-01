import React, { useState } from 'react';
import '../Styles/PlantCardComponent.scss'
import { Badge, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { PiPottedPlantFill } from "react-icons/pi";
import PropTypes from "prop-types";
import {
    checkCategory,
    checkConservationWhenWholesalePlant,
    checkDiscountRibbonWhenWholesalePlant,
    checkPriceRibbonWhenWholesalePlant,
    checkScreenForShoppingCart,
    checkTitleForSoldOutAndNewItem
} from "../Utils/PlantCardUtils";
import { AGOTADO, NEW, NUEVO, SOLD_OUT } from "../Constants/Constants";
import { useNavigate } from "react-router-dom";
import { getTypeUserAndScreenToRoute } from "../Utils/routerUtils";

const PlantCardComponent = ( { plantObj, isLoading, user, screen } ) => {

    const navigate = useNavigate();
    const navigateToDetailProduct = ( plantUid, priceCollector ) => {

        const newPlantsPathname = getTypeUserAndScreenToRoute( screen, priceCollector );

        navigate( `/detail-product/${newPlantsPathname.typeUser}/${newPlantsPathname.screen}/${plantUid}`, {
            replace: false,
            preventScrollReset: true
        } );
    }

    const checkForSoldOutAndNewItem = checkTitleForSoldOutAndNewItem( plantObj.quantity, plantObj.publishedDate );

    const [ loading ] = useState( isLoading );
    return (
        <Card
            hoverable
            style={{ maxWidth: 350 }}
            loading={loading}
            onClick={() => navigateToDetailProduct( plantObj.uid, plantObj.priceCollector )}
            cover={
                checkForSoldOutAndNewItem === SOLD_OUT ?
                    <img
                        alt="example"
                        className='img-plant-card'
                        style={{ filter: 'grayscale(80%)' }}
                        src={plantObj.photos[ 0 ]}
                    /> :
                    <img
                        alt="example"
                        className='img-plant-card'
                        src={plantObj.photos[ 0 ]}
                    />
            }
            actions={
                [
                    checkConservationWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, user, plantObj ),
                    checkScreenForShoppingCart( screen, plantObj.priceCollector, plantObj.priceWholesale, user, plantObj )
                    ,
                    <div key={"size"} className='plant-size'>
                        <Tooltip placement="top"
                                 autoAdjustOverflow={true}
                                 trigger={[ 'click', 'hover' ]}
                                 title={'Tamaño Matero'}>
                            <PiPottedPlantFill
                                color={'#A0522D'}
                                size={20}
                                style={{ marginTop: 4 }}/>
                        </Tooltip>
                        <span style={{lineHeight: 2}}>
                        {plantObj.size}
                        </span>
                    </div>,
                ]}>
            {
                checkForSoldOutAndNewItem === 'no-title' ?
                    <div></div> :
                    <Badge.Ribbon className='ribbon-card-new-item-sold-out'
                                  color={checkForSoldOutAndNewItem === NEW ? 'cyan' : 'red'}
                                  text={checkForSoldOutAndNewItem === NEW ? NUEVO : AGOTADO}
                                  placement='end'>
                    </Badge.Ribbon>
            }
            {checkForSoldOutAndNewItem !== SOLD_OUT &&
                checkDiscountRibbonWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, user )
            }
            {checkForSoldOutAndNewItem !== SOLD_OUT &&
                checkPriceRibbonWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, user )
            }
            <Meta
                avatar={checkCategory( plantObj.category, 40 )}
                title={`${plantObj.genre} ${plantObj.species}`}
                description={plantObj.specialFeature || ''}
            />
        </Card>
    );
};

PlantCardComponent.propTypes = {
    plantObj: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    screen: PropTypes.string.isRequired
};

export default PlantCardComponent;
