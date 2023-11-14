import React, { useEffect, useState } from 'react';
import '../styles/DetailProductScreen.scss'
import { Badge, Col, Flex, Image, Row } from "antd";
import { useLocation, useParams } from "react-router-dom";
import {
    checkCategory,
    checkConservation,
    checkDiscountWhenWholesalePlant,
    checkPriceWhenWholesalePlant,
    checkTitleForSoldOutAndNewItem
} from "../utils/PlantCardUtils";
import { fallbackImage, SOLD_OUT } from "../constants/Constants";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { startGetPlants } from "../services/PlantService";
import { getNameByPathname, getUriNameByPathname } from "../utils/routerUtils";
import { getPlantsScheme } from "../store/plant/plantSlice";
import { dispatchBrowserHistory, dispatchScreenName } from "../store/screen/screenBrowserHistoryThunks";


const DetailProductScreen = ( { isWholesaleUser } ) => {

    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const [ plant, setPlant ] = useState( null )

    const { uid } = useParams();

    const classesName = [ 'secondary-photo', 'tertiary-photo', 'extra-photo' ];

    const [ selectedPhoto, setSelectedPhoto ] = useState( '' );
    const [ checkForSoldOutAndNewItem, setCheckForSoldOutAndNewItem ] = useState()


    const { plants } = useSelector( state => state.plants );
    const { browserHistory } = useSelector( state => state.screen );

    const reloadPlants = async () => {
        const result = await startGetPlants( getUriNameByPathname( pathname ) );
        await dispatch( getPlantsScheme( result ) );
        const filteredPlant = result.plants.filter( plant => plant[ '_id' ] === uid )[ 0 ];
        setPlant( filteredPlant );
        setSelectedPhoto( filteredPlant.photos[ 0 ] );
        setCheckForSoldOutAndNewItem( checkTitleForSoldOutAndNewItem( filteredPlant.quantity, filteredPlant.publishedDate ) );
        const { genre, species } = filteredPlant;
        dispatch( dispatchScreenName( pathname ) );
        dispatch( dispatchBrowserHistory( [ {
            breadcrumb: getNameByPathname(`/${pathname.split( '/' )[ 1 ]}`),
            pathname: `/${pathname.split( '/' )[ 1 ]}`
        } ], uid, genre, species, pathname ) );
    }


    useEffect( () => {
        if ( plants.length > 0 ) {
            const filteredPlant = plants.filter( plant => plant[ '_id' ] === uid )[ 0 ];
            setSelectedPhoto( filteredPlant.photos[ 0 ] );
            setCheckForSoldOutAndNewItem( checkTitleForSoldOutAndNewItem( filteredPlant.quantity, filteredPlant.publishedDate ) );
            const { genre, species } = filteredPlant;
            dispatch( dispatchBrowserHistory( [ browserHistory[ 0 ] ], uid, genre, species, pathname ) );
            return setPlant( filteredPlant );
        }
        reloadPlants().then();
    }, [] );

    return (
        plant &&
        <Flex style={{ backgroundColor: '#FFFFFF' }}>
            <Col className='image-chooser'>
                <div className="container-detail-product">
                    {
                        plant.photos.map( ( photo, index ) => (
                            <div key={photo} className={classesName[ index ]}>
                                <Image.PreviewGroup items={plant.photos}>
                                    <Image
                                        wrapperClassName
                                        className='secondary-images'
                                        style={{
                                            cursor: "pointer",
                                            filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)'
                                        }}
                                        fallback={fallbackImage}
                                        src={photo}
                                    />
                                </Image.PreviewGroup>
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
                                    isWholesaleUser )}
                            placement={checkForSoldOutAndNewItem === SOLD_OUT ? 'end' : 'start'}>
                            <Image.PreviewGroup items={plant.photos}>
                                <Image
                                    wrapperClassName
                                    className='primary-image'
                                    style={{ filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)' }}
                                    fallback={fallbackImage}
                                    src={selectedPhoto}
                                />
                            </Image.PreviewGroup>
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
                {isWholesaleUser && !plant.priceCollector &&
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
                        <span> {checkPriceWhenWholesalePlant( plant.discountCollector, plant.priceCollector, plant.discountWholesale, plant.priceWholesale, isWholesaleUser )}</span>
                    </Row>
                }
                {isWholesaleUser && checkForSoldOutAndNewItem !== SOLD_OUT &&
                    <Row className='cart-product'>
                        Add to CART
                    </Row>
                }
            </Col>
        </Flex>
    );
};

DetailProductScreen.propTypes = {
    isWholesaleUser: PropTypes.bool.isRequired
};

export default DetailProductScreen;
