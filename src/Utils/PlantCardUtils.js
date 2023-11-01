import { TbPlant2 } from "react-icons/tb";
import { PiCactusFill } from "react-icons/pi";
import { GiBulb, GiCarnivorousPlant } from "react-icons/gi";
import { Badge, Button, Tag, Tooltip } from "antd";
import { BsCloudsFill, BsSunFill } from "react-icons/bs";
import { FaCloudSun } from "react-icons/fa6";
import React from "react";
import { dateDiffInDays } from "./CalcDiffDays";
import { FaShoppingCart } from "react-icons/fa";
import { currencyFormat, currencyFormatWithDiscount, discountFormat } from "./PipesNumber";
import { CARNIVOROUS, COLLECTOR, NEW, NEW_PLANTS, SOLD_OUT, WHOLESALE } from "../Constants/Constants";

export const checkCategory = ( value, size ) => {
    if ( value === 'Succulent' ) {
        return <TbPlant2 size={size} color={'#90486D'}/>
    } else if ( value === 'Cactus' ) {
        return <PiCactusFill size={size} color={'#2C5920'}/>
    } else if ( value === 'Bulb' ) {
        return <GiBulb size={size} color={'#2C5920'}/>;
    } else {
        return <GiCarnivorousPlant size={size} color={'#2C5920'}/>;
    }
}

export const checkConservation = ( value, size ) => {

    return value.map( ( cons ) => {
        if ( cons === 'sun' ) {
            return <Tooltip key={'sun'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            mouseLeaveDelay={0.1}
                            title={'Sol directo'}>
                <BsSunFill size={size} color={'#FDD30F'}/>
            </Tooltip>;
        } else if ( cons === 'light-shade' ) {
            return <Tooltip key={'light-shade'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            title={'Sol de la mañana o filtrado'}>
                <FaCloudSun size={size} color={'#FFA500'}/> </Tooltip>
        } else {
            return <Tooltip key={'shade'}
                            placement="top"
                            autoAdjustOverflow={true}
                            trigger={[ 'click', 'hover' ]}
                            title={'Buena iluminación sin sol directo'}>
                <BsCloudsFill size={size} color={'#008AF6'}/> </Tooltip>
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
export const checkScreenForShoppingCart = ( screen, priceCollector, priceWholesale, user, plantObj ) => {
    if ( ( screen === NEW_PLANTS || screen === COLLECTOR || screen === CARNIVOROUS ) && priceCollector && checkTitleForSoldOutAndNewItem(plantObj.quantity, plantObj.publishedDate) !== 'SOLD-OUT' ) {
        return <Button key={"Cart"}
                       style={{ backgroundColor: '#D6249F', width: '80%' }}
                       icon={<FaShoppingCart color={'#FFFFFF'}/>}/>;
    }

    if ( ( screen === NEW_PLANTS || screen === WHOLESALE ) && !priceCollector && user.isWholesaleUser && priceWholesale ) {
        return <span className='wholesale-quantity'>{`MXOQ ${plantObj.minOrder}`}</span>;
    }

    if (( screen === NEW_PLANTS || screen === COLLECTOR || screen === CARNIVOROUS ) &&
        checkTitleForSoldOutAndNewItem(plantObj.quantity, plantObj.publishedDate) === 'SOLD-OUT') {
        return <Button key={"Cart"}
                       className='disable-cart-button'
                       disabled={true}
                       style={{ backgroundColor: '#D6249F', width: '80%' }}
                       icon={<FaShoppingCart color={'#FFFFFF'}/>}/>;
    }

    return <div></div>;
}

export const checkDiscountRibbonWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, user ) => {
    if ( priceCollector && discountCollector ) {
        return <Badge.Ribbon className='ribbon-card-discount'
                             placement={'start'} color='volcano'
                             text={discountFormat( discountCollector )}/>;
    }

    if ( !priceCollector && user.isWholesaleUser && priceWholesale && discountWholesale ) {
        return <Badge.Ribbon className='ribbon-card-discount'
                             placement={'start'} color='volcano'
                             text={discountFormat( discountWholesale )}/>;
    }


    return <div></div>;
}

export const checkDiscountWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, user ) => {
    if ( priceCollector && discountCollector ) {
        return discountFormat( discountCollector );
    }

    if ( !priceCollector && user.isWholesaleUser && priceWholesale && discountWholesale ) {
        return discountFormat( discountWholesale );
    }


    return <div></div>;
}

export const checkPriceRibbonWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, user ) => {
    if ( priceCollector ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color={'#1677FF'}
                             text={
                                 discountCollector ?
                                     currencyFormatWithDiscount( priceCollector, discountCollector ) :
                                     currencyFormat( priceCollector )}/>
    }

    if ( !priceCollector && user.isWholesaleUser && priceWholesale ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color='purple'
                             text={discountWholesale ?
                                 currencyFormatWithDiscount( priceWholesale, discountWholesale ) :
                                 currencyFormat( priceWholesale )}/>;
    }

    if ( !priceCollector && !user.isWholesaleUser && priceWholesale ) {
        return <Badge.Ribbon className='ribbon-card-price'
                             placement={'start'} color='purple'
                             text='Mayorista'/>;
    }

    return <div></div>;
}

export const checkPriceWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, user ) => {

    if ( priceCollector ) {
        return discountCollector ?
            currencyFormatWithDiscount( priceCollector, discountCollector ) :
            currencyFormat( priceCollector );
    }

    if ( !priceCollector && user.isWholesaleUser && priceWholesale ) {
        return discountWholesale ?
            currencyFormatWithDiscount( priceWholesale, discountWholesale ) :
            currencyFormat( priceWholesale );
    }

    if ( !priceCollector && !user.isWholesaleUser && priceWholesale ) {
        return <Tag color="purple">Mayorista</Tag>;
    }

    return <div></div>;
}

export const checkConservationWhenWholesalePlant = ( discountCollector, priceCollector, discountWholesale, priceWholesale, user, plantObj ) => {
    if ( priceCollector ) {
        return <div key={"Cons"} className='conservation-icons'>
            {checkConservation( plantObj.conservation, 20 )}
        </div>
    }

    if ( !priceCollector && user.isWholesaleUser ) {
        return <span className='wholesale-quantity'>{`MOQ ${plantObj.minOrder}`}</span>
    }
}
