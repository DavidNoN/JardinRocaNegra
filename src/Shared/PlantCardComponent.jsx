import React from 'react';
import '../styles/PlantCardComponent.scss'
import { Badge, Card, Image, Watermark } from "antd";
import Meta from "antd/es/card/Meta";
import PropTypes from "prop-types";
import {
    checkCategory,
    checkConservationPlant,
    checkDiscountRibbonWhenWholesalePlant,
    checkPriceRibbonPlant,
    checkScreenForShoppingCart,
    checkTitleForSoldOutAndNewItem
} from "../utils/PlantCardUtils";
import { AGOTADO, NEW, NUEVO, SOLD_OUT } from "../constants/Constants";
import { useLocation, useNavigate } from "react-router-dom";

const PlantCardComponent = ( { plantObj, isLoading, isWholesaleUser, screen } ) => {

    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    const navigateToDetailProduct = ( plantUid ) => {

        return navigate( `/${pathname.split( '/' )[ 1 ]}/detail-product/${plantUid}`, {
            preventScrollReset: true
        } );
    }

    const checkForSoldOutAndNewItem = checkTitleForSoldOutAndNewItem( plantObj.quantity, plantObj.publishedDate );

    return (
        <Card
            hoverable
            style={{ maxWidth: 350 }}
            loading={isLoading}
            cover={
                checkForSoldOutAndNewItem === SOLD_OUT ?
                    <Watermark content="Jardín Roca Negra" font={{ color: 'rgba(0,0,0,0.3)' }}>
                        <Image
                            alt="example"
                            preview={false}
                            className='img-plant-card'
                            style={{ filter: 'grayscale(80%)' }}
                            src={plantObj.photos[ 0 ]}
                            onClick={() => navigateToDetailProduct( plantObj[ '_id' ] )}
                        /> </Watermark> :
                    <Watermark content="Jardín Roca Negra" font={{ color: 'rgba(0,0,0,0.15)' }}>
                        <Image
                            alt="example"
                            className='img-plant-card'
                            preview={false}
                            onClick={() => navigateToDetailProduct( plantObj[ '_id' ] )}
                            src={plantObj.photos[ 0 ]}
                        />
                    </Watermark>
            }
            actions={
                [
                    checkConservationPlant( plantObj.discountCollector[0], plantObj.priceCollector[0], plantObj.discountWholesale[0], plantObj.priceWholesale[0], isWholesaleUser, plantObj ),
                    checkScreenForShoppingCart( screen, plantObj.priceCollector[0], plantObj.priceWholesale[0], isWholesaleUser, plantObj, '' )
                    ,
                    <div key={"size"} className='plant-size'>
                        Cant. {plantObj.quantity}
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
                checkDiscountRibbonWhenWholesalePlant( plantObj.discountCollector[0], plantObj.priceCollector[0], plantObj.discountWholesale[0], plantObj.priceWholesale[0], isWholesaleUser, screen )
            }
            {checkForSoldOutAndNewItem !== SOLD_OUT &&
                checkPriceRibbonPlant( plantObj.discountCollector[0], plantObj.priceCollector[0], plantObj.discountWholesale[0], plantObj.priceWholesale[0], isWholesaleUser , screen)
            }
            <Meta
                avatar={checkCategory( plantObj.category, 40 )}
                title={`${plantObj.genre} ${plantObj.species}`}
                description={plantObj.specialFeature || ''}
                onClick={() => navigateToDetailProduct( plantObj[ '_id' ] )}
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
