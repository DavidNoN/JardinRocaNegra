import React from 'react';
import '../styles/PlantCardComponent.scss'
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
} from "../utils/PlantCardUtils";
import { AGOTADO, NEW, NUEVO, SOLD_OUT } from "../constants/Constants";
import { useLocation, useNavigate } from "react-router-dom";

const PlantCardComponent = ( { plantObj, isLoading, isWholesaleUser, screen } ) => {

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const navigateToDetailProduct = ( plantUid ) => {

        return navigate( `/${pathname.split('/')[1]}/detail-product/${plantUid}`, {
            replace: true,
            preventScrollReset: true
        } );
    }

    const checkForSoldOutAndNewItem = checkTitleForSoldOutAndNewItem( plantObj.quantity, plantObj.publishedDate );

    return (
        <Card
            hoverable
            style={{ maxWidth: 350 }}
            loading={isLoading}
            onClick={() => navigateToDetailProduct( plantObj[ '_id' ])}
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
                    checkConservationWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, isWholesaleUser, plantObj ),
                    checkScreenForShoppingCart( screen, plantObj.priceCollector, plantObj.priceWholesale, isWholesaleUser, plantObj )
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
                        <span style={{ lineHeight: 2 }}>
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
                checkDiscountRibbonWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, isWholesaleUser )
            }
            {checkForSoldOutAndNewItem !== SOLD_OUT &&
                checkPriceRibbonWhenWholesalePlant( plantObj.discountCollector, plantObj.priceCollector, plantObj.discountWholesale, plantObj.priceWholesale, isWholesaleUser )
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
    isWholesaleUser: PropTypes.bool.isRequired,
    screen: PropTypes.string.isRequired
};

export default PlantCardComponent;
