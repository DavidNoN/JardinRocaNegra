import React, { useState } from 'react';
import '../Styles/DetailProductScreen.scss'
import { Badge, Col, Flex, Image, Row } from "antd";
import { useParams } from "react-router-dom";
import { plants, userP } from "./BaseScreen";
import {
    checkCategory,
    checkConservation,
    checkDiscountWhenWholesalePlant,
    checkPriceWhenWholesalePlant,
    checkTitleForSoldOutAndNewItem
} from "../Utils/PlantCardUtils";
import { SOLD_OUT } from "../Constants/Constants";


const DetailProductScreen = () => {

    const routeParams = useParams();

    const classesName = [ 'secondary-photo', 'tertiary-photo', 'extra-photo' ];

    const plant = plants.filter( plant => plant.uid === routeParams.uid )[ 0 ];

    const user = userP;

    // const typeUser = routeParams.screen.match(/^(\w+)/)[1]

    const [ selectedPhoto, setSelectedPhoto ] = useState( plant.photos[ 0 ] );

    const changeSelectedPlant = ( index ) => {
        setSelectedPhoto( plant.photos[ index ] );
    }

    const checkForSoldOutAndNewItem = checkTitleForSoldOutAndNewItem( plant.quantity, plant.publishedDate );

    return (

        <Flex wrap='wrap' style={{ backgroundColor: '#FFFFFF' }}>
            <Col className='image-chooser'>
                <div className="container-detail-product">
                    {
                        plant.photos.map( ( photo, index ) => (
                            <div key={photo} className={classesName[ index ]}>
                                <Image
                                    className='secondary-images'
                                    preview={false}
                                    style={{
                                        cursor: "pointer",
                                        filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)'
                                    }}
                                    onClick={() => changeSelectedPlant( index )}
                                    src={photo}
                                />
                            </div>
                        ) )
                    }
                    <div className="main-photo">
                        <Badge.Ribbon
                            color={checkForSoldOutAndNewItem === SOLD_OUT ? 'red' : 'volcano'}
                            text={checkForSoldOutAndNewItem === SOLD_OUT ? 'AGOTADO' :
                                checkDiscountWhenWholesalePlant(
                                    plant.discountCollector,
                                    plant.priceCollector,
                                    plant.discountWholesale,
                                    plant.priceWholesale,
                                    user )}
                            placement={checkForSoldOutAndNewItem === SOLD_OUT ? 'end' : 'start'}>
                            <Image
                                className='primary-image'
                                style={{ filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)' }}
                                src={selectedPhoto}
                            />
                        </Badge.Ribbon>
                    </div>
                </div>

            </Col>
            <Col className='product-summary'>
                <Row className='title-product'>
                    {`${plant.genre} ${plant.species}`}
                </Row>
                <Row className='category-product'>
                    Categoría: <span>{plant.category}</span> <span>{checkCategory( plant.category, 30 )}</span>
                </Row>
                <Row className='family-product'>
                    Familia: <span> {plant.family}</span>
                </Row>
                <Row className='special-product'>
                    Característica: <span>{plant.specialFeature} </span>
                </Row>
                <Row className='description-product'>
                    Descripción: {plant.description}
                </Row>
                <Row className='size-conservation-product size-detail'>
                    Tamaño: <span> {plant.size}</span>
                </Row>
                <Row span={12} className='size-conservation-product conservation-detail'>
                    <span> {checkConservation( plant.conservation, 30 )}</span>
                </Row>
                {user.isWholesaleUser && !plant.priceCollector &&
                    <Row className='min-max-order-product'>
                        <Col span={12}>
                            Orden Mínima (MOQ): <span> {plant.minOrder}</span>
                        </Col>
                        <Col span={12}>
                            Orden Máxima (MXOQ): <span> {plant.maxOrder}</span>
                        </Col>
                    </Row>
                }
                {
                    checkForSoldOutAndNewItem !== SOLD_OUT &&
                    <Row className='price-product'>
                        <span> {checkPriceWhenWholesalePlant( plant.discountCollector, plant.priceCollector, plant.discountWholesale, plant.priceWholesale, user )}</span>
                    </Row>
                }
                {user.isWholesaleUser && checkForSoldOutAndNewItem !== SOLD_OUT &&
                    <Row className='cart-product'>
                        Add to CART
                    </Row>
                }
            </Col>
        </Flex>
    );
};

export default DetailProductScreen;
