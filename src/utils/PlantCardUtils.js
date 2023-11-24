import { TbPlant2 } from "react-icons/tb";
import { PiCactusFill } from "react-icons/pi";
import { GiBulb, GiCarnivorousPlant } from "react-icons/gi";
import { Badge, Button, Tag, Tooltip } from "antd";
import React from "react";
import { dateDiffInDays } from "./CalcDiffDays";
import { FaShoppingCart, FaSun } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa6";
import { IoCloudyNight } from "react-icons/io5";
import {
    currencyFormat,
    currencyFormatForDetail,
    currencyFormatWithDiscount,
    currencyFormatWithDiscountForDetail,
    discountFormat
} from "./PipesNumber";
import { CARNIVOROUS, COLLECTOR, NEW, NEW_PLANTS, SOLD_OUT, WHOLESALE } from "../constants/Constants";

export const checkCategory = ( value, size ) => {
    if ( value === 'Succulents' ) {
        return <TbPlant2 size={size} color={'#90486D'}/>
    } else if ( value === 'Cactus' ) {
        return <PiCactusFill size={size} color={'#2C5920'}/>
    } else if ( value === 'Bulbs' ) {
        return <GiBulb size={size} color={'#2C5920'}/>;
    } else {
        return <GiCarnivorousPlant size={size} color={'#2C5920'}/>;
    }
}

export const checkConservation = ( value, size ) => {

    return value.map( ( cons ) => {
        // fff03e
        if ( cons === 'sun' ) {
            return <Tooltip key={'sun'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            mouseLeaveDelay={0.1}
                            title={'Sol directo'}>
                <FaSun size={size} color={'#ffeb00'}/>
            </Tooltip>;
        } else if ( cons === 'light-shade' ) {
            return <Tooltip key={'light-shade'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            title={'Sol de la mañana o filtrado'}>
                <svg width="0" height="0">
                    <linearGradient id="blue-gradient" x1="50%" y1="30%" x2="65%" y2="50%">
                        <stop stopColor="#ffeb00" offset="73%"/>
                        <stop stopColor="#c1e7ff" offset="75%"/>
                    </linearGradient>
                </svg>
                <FaCloudSun size={size} style={{ stroke: 'url(#blue-gradient)', fill: 'url(#blue-gradient)' }}/>
            </Tooltip>
        } else {
            return <Tooltip key={'shade'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            title={'Buena iluminación sin sol directo'}>
                <IoCloudyNight size={size} color={'#99d7ff'}/> </Tooltip>
        }
    } );
}

export const checkTitleForSoldOutAndNewItem = ( quantity, date ) => {
    if ( quantity === 0 ) {
        return SOLD_OUT
    } else if ( dateDiffInDays( new Date( date ), new Date() ) < 15 ) {
        return NEW
    }

    return 'no-title';
}
export const checkScreenForShoppingCart = ( screen, priceCollector, priceWholesale, isWholesaleUser, plantObj, title ) => {
    if ( ( screen === NEW_PLANTS || screen === COLLECTOR || screen === CARNIVOROUS ) && priceCollector && checkTitleForSoldOutAndNewItem( plantObj.quantity, plantObj.publishedDate ) !== 'SOLD-OUT' ) {
        return <Button key={"Cart"}
                       title={title}
                       style={{ backgroundColor: '#D6249F', width: '80%' }}
                       icon={<FaShoppingCart color={'#FFFFFF'}/>}/>;
    }

    if ( ( screen === NEW_PLANTS || screen === WHOLESALE ) && !priceCollector && isWholesaleUser && priceWholesale ) {
        return <span className='wholesale-quantity'>{`MXOQ ${plantObj.minOrder}`}</span>;
    }

    if ( ( screen === NEW_PLANTS || screen === COLLECTOR || screen === CARNIVOROUS ) &&
        checkTitleForSoldOutAndNewItem( plantObj.quantity, plantObj.publishedDate ) === 'SOLD-OUT' ) {
        return <Button key={"Cart"}
                       className='disable-cart-button'
                       disabled={true}
                       style={{ backgroundColor: '#D6249F', width: '80%' }}
                       icon={<FaShoppingCart color={'#FFFFFF'}/>}/>;
    }

    return <div></div>;
}

export const checkDiscountRibbonWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screen ) => {

    if ( discountCollector && screen !== WHOLESALE ) {
        return <Badge.Ribbon className='ribbon-card-discount'
                             placement={'start'} color='volcano'
                             text={discountFormat( discountCollector )}/>;
    }

    if ( screen === WHOLESALE && isWholesaleUser && discountWholesale ) {
        return <Badge.Ribbon className='ribbon-card-discount'
                             placement={'start'} color='volcano'
                             text={discountFormat( discountWholesale )}/>;
    }


    return <div></div>;
}


export const checkPriceRibbonPlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screen ) => {

    if ( priceCollector && screen !== WHOLESALE ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color={'#1677FF'}
                             text={
                                 discountCollector ?
                                     currencyFormatWithDiscount( priceCollector, discountCollector ) :
                                     currencyFormat( priceCollector )}/>
    }

    if ( screen === WHOLESALE && isWholesaleUser && priceWholesale ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color='purple'
                             text={discountWholesale ?
                                 currencyFormatWithDiscount( priceWholesale, discountWholesale ) :
                                 currencyFormat( priceWholesale )}/>;
    }

    if ( screen === WHOLESALE && !isWholesaleUser ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color='purple'
                             text='Mayorista'/>;
    }

    return <Badge.Ribbon className='ribbon-card-price'
                         placement={'start'} color='purple'
                         text={discountWholesale ?
                             currencyFormatWithDiscount( priceWholesale, discountWholesale ) :
                             currencyFormat( priceWholesale )}/>;

}

export const checkPricePlantForDetail = ( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screen ) => {

    if ( priceCollector && screen !== WHOLESALE ) {
        return discountCollector ?
            currencyFormatWithDiscountForDetail( priceCollector, discountCollector ) :
            currencyFormatForDetail( priceCollector );
    }

    if ( screen === WHOLESALE && isWholesaleUser && priceWholesale ) {
        return discountWholesale ?
            currencyFormatWithDiscountForDetail( priceWholesale, discountWholesale ) :
            currencyFormatForDetail( priceWholesale );
    }

    if ( screen === WHOLESALE && !isWholesaleUser ) {
        return <Tag color="purple">Mayorista</Tag>;
    }

    return discountWholesale ?
        currencyFormatWithDiscountForDetail( priceWholesale, discountWholesale ) :
        currencyFormatForDetail( priceWholesale );
}

export const checkDiscountRibbonPlantForDetail = ( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screen ) => {

    if ( discountCollector && screen !== WHOLESALE ) {
        return <Badge.Ribbon placement={'end'} color='geekblue'
                             text={discountFormat( discountCollector )}/>;
    }

    if ( screen === WHOLESALE && isWholesaleUser && discountWholesale ) {
        return <Badge.Ribbon placement={'end'} color='geekblue'
                             text={discountFormat( discountWholesale )}/>;
    }


    return null;
}

export const checkConservationPlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, plantObj ) => {
    if ( priceCollector ) {
        return <div key={"Cons"} className='conservation-icons'>
            {checkConservation( plantObj.conservation, 20 )}
        </div>
    }

    if ( !priceCollector && isWholesaleUser ) {
        return <span className='wholesale-quantity'>{`MOQ ${plantObj.minOrder[0]}`}</span>
    }
}

export const checkSelectorScreenPlant = (newPlants, wholesalePlants, collectionPlants, carnivorousPlants, screenName ) => {

    if (screenName === NEW_PLANTS) {
        return newPlants || [];
    }
    if (screenName === WHOLESALE) {
        return wholesalePlants || [];
    }
    if (screenName === COLLECTOR) {
        return collectionPlants || [];
    }
    if (screenName === CARNIVOROUS) {
        return carnivorousPlants || [];
    }

    return [];

}

export const validateIfNeedToReloadPlants = (newPlants, wholesalePlants, collectionPlants, carnivorousPlants, screenName ) => {

    if (screenName === NEW_PLANTS && newPlants?.length === 0) {
        return true;
    }
    if (screenName === WHOLESALE && wholesalePlants?.length === 0) {
        return true;
    }
    if (screenName === COLLECTOR && collectionPlants?.length === 0) {
        return true;
    }
    return !!( screenName === CARNIVOROUS && carnivorousPlants.length === 0 );

}
