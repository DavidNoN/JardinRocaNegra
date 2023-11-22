import React, { useEffect, useState } from 'react';
import '../styles/DetailProductScreen.scss'
import { useLocation, useParams } from "react-router-dom";
import {
    checkCategory,
    checkConservation,
    checkDiscountRibbonPlantForDetail,
    checkPricePlantForDetail, checkSelectorScreenPlant,
    checkTitleForSoldOutAndNewItem
} from "../utils/PlantCardUtils";
import { fallbackImage, NEW_PLANTS, SOLD_OUT, WHOLESALE } from "../constants/Constants";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getNameByPathname, getUriNameByPathname } from "../utils/routerUtils";
import { dispatchBrowserHistory, dispatchScreenName } from "../store/screen/screenBrowserHistoryThunks";
import { Button, Col, Flex, Image, Row } from "antd";
import { IoMdShare } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { getPlantsThunk } from "../store/plant/plantThunks";


const DetailProductScreen = ( { isWholesaleUser, screenName } ) => {

    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const { newPlants, wholesalePlants, collectionPlants, carnivorousPlants } = useSelector( state => state.plants );
    const plants = checkSelectorScreenPlant( newPlants, wholesalePlants, collectionPlants, carnivorousPlants, screenName );
    const [ plant, setPlant ] = useState( null );

    const { uid } = useParams();

    const [ selectedPhoto, setSelectedPhoto ] = useState( '' );
    const [ checkForSoldOutAndNewItem, setCheckForSoldOutAndNewItem ] = useState();
    const [ selectedSize, setSelectedSize ] = useState( 0 );
    const [ priceCollector, setPriceCollector ] = useState( 0 );
    const [ discountCollector, setDiscountCollector ] = useState( 0.0 );
    const [ priceWholesale, setPriceWholesale ] = useState( 0 );
    const [ discountWholesale, setDiscountWholesale ] = useState( 0 );
    const [ minOrderQuantity, setMinOrderQuantity ] = useState( 0 );
    const [ maxOrderQuantity, setMaxOrderQuantity ] = useState( 0 );
    const [ selectedIndex, setSelectedIndex ] = useState( 0 );

    const { browserHistory } = useSelector( state => state.screen );


    const createFilteredPlantObject = ( filteredPlant ) => {
        setPriceCollector( filteredPlant.priceCollector[ 0 ] );
        setDiscountCollector( filteredPlant.discountCollector[ 0 ] );
        setPriceWholesale( filteredPlant.priceWholesale[ 0 ] );
        setDiscountWholesale( filteredPlant.discountWholesale[ 0 ] );
        setMinOrderQuantity( filteredPlant.minOrder[ 0 ] );
        setMaxOrderQuantity( filteredPlant.maxOrder[ 0 ] );
        return {
            ...filteredPlant,
            photos: filteredPlant.photos.map( ( photo, index ) => {
                if ( index === 0 ) {
                    return {
                        photo,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    photo,
                    border: '1px solid #A6A6A6FF'
                }
            } ),
            sizeCollector: filteredPlant.sizeCollector.map( ( size, index ) => {
                if ( index === 0 ) {
                    return {
                        size,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    size,
                    border: '1px solid #A6A6A6FF'
                }
            } ),
            sizeWholesale: filteredPlant.sizeWholesale.map( ( size, index ) => {
                if ( index === 0 ) {
                    return {
                        size,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    size,
                    border: '1px solid #A6A6A6FF'
                }
            } )
        };
    }

    const createLinkShare = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${process.env.REACT_APP_PHONE}&text=${encodeURIComponent( process.env.REACT_APP_UI_URL + pathname )}`;
        const newWindow = window.open( whatsappUrl, '_blank' );
        newWindow.focus();
    }

    const reloadPlants = async () => {
        const result = await getPlantsThunk( dispatch, getUriNameByPathname( pathname ) );
        let filteredPlant = result.plants.filter( plant => plant[ '_id' ] === uid )[ 0 ];
        filteredPlant = createFilteredPlantObject( filteredPlant );
        setPlant( filteredPlant );
        setSelectedPhoto( filteredPlant.photos[ 0 ].photo );
        setCheckForSoldOutAndNewItem( checkTitleForSoldOutAndNewItem( filteredPlant.quantity, filteredPlant.publishedDate ) );
        const { genre, species } = filteredPlant;
        dispatch( dispatchScreenName( pathname ) );
        dispatch( dispatchBrowserHistory( [ {
            breadcrumb: getNameByPathname( `/${pathname.split( '/' )[ 1 ]}` ),
            pathname: `/${pathname.split( '/' )[ 1 ]}`
        } ], uid, genre, species, pathname ) );
    }


    useEffect( () => {
        if ( plants.length > 0 ) {
            let filteredPlant = plants.filter( plant => plant[ '_id' ] === uid )[ 0 ];
            setCheckForSoldOutAndNewItem( checkTitleForSoldOutAndNewItem( filteredPlant.quantity, filteredPlant.publishedDate ) );
            const { genre, species } = filteredPlant;
            dispatch( dispatchBrowserHistory( [ browserHistory[ 0 ] ], uid, genre, species, pathname ) );
            filteredPlant = createFilteredPlantObject( filteredPlant );
            setSelectedPhoto( filteredPlant.photos[ 0 ].photo );
            return setPlant( filteredPlant );
        }
        reloadPlants().then();
    }, [] );

    const switchSelectedPhoto = ( indexSelectedPhoto, indexSelectedSize ) => {
        setSelectedIndex( indexSelectedPhoto );
        if ( indexSelectedPhoto + 1 > plant.photos.length ) {
            indexSelectedPhoto = plant.photos.length - 1;
        }
        setSelectedSize( indexSelectedSize );
        setSelectedPhoto( plant.photos[ indexSelectedPhoto ].photo );
        setPriceCollector( plant.priceCollector[ indexSelectedSize ] );
        setDiscountCollector( plant.discountCollector[ indexSelectedSize ] );
        setPriceWholesale( plant.priceWholesale[ indexSelectedSize ] );
        setDiscountWholesale( plant.discountWholesale[ indexSelectedSize ] );
        setMinOrderQuantity( plant.minOrder[ indexSelectedSize ] );
        setMaxOrderQuantity( plant.maxOrder[ indexSelectedSize ] );
        setPlant( prevState => ( {
            ...prevState,
            photos: plant.photos.map( ( photo, index ) => {
                if ( index === indexSelectedPhoto ) {
                    return {
                        photo: photo.photo,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    photo: photo.photo,
                    border: '1px solid #A6A6A6FF'
                }
            } ),
            sizeCollector: plant.sizeCollector.map( ( size, index ) => {
                if ( index === indexSelectedSize ) {
                    return {
                        size: size.size,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    size: size.size,
                    border: '1px solid #A6A6A6FF'
                }
            } ),
            sizeWholesale: plant.sizeWholesale.map( ( size, index ) => {
                if ( index === indexSelectedSize ) {
                    return {
                        size: size.size,
                        border: '2px solid #D6249FFF'
                    }
                }
                return {
                    size: size.size,
                    border: '1px solid #A6A6A6FF'
                }
            } )
        } ) );
    }


    return (
        plant &&
        <Flex className="product">
            <div className="product__photo">
                <div className="photo-container">
                    {checkDiscountRibbonPlantForDetail( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screenName )}
                    <div className="photo-main">
                        <div className="controls">
                            <IoMdShare size={24} style={{ cursor: 'pointer' }} onClick={() => createLinkShare()}/>
                            <FaRegHeart size={24} style={{ cursor: 'pointer' }}/>
                        </div>
                        <div>
                            <Image.PreviewGroup items={plant.photos.map( ( photo ) => photo.photo )}
                                                preview={{ current: selectedIndex }}>
                                <Image
                                    wrapperClassName
                                    className='primary-image'
                                    style={{ filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)' }}
                                    fallback={fallbackImage}
                                    src={selectedPhoto}
                                />
                            </Image.PreviewGroup>
                        </div>
                    </div>
                    <Row className="photo-album">
                        {
                            plant.photos.map( ( photo, index ) => (
                                <Col key={photo.photo}>
                                    <Image
                                        wrapperClassName
                                        className='secondary-images'
                                        onClick={() => switchSelectedPhoto( index, selectedSize )}
                                        preview={false}
                                        style={{
                                            border: photo.border,
                                            cursor: "pointer",
                                            filter: checkForSoldOutAndNewItem === SOLD_OUT && 'grayscale(80%)'
                                        }}
                                        fallback={fallbackImage}
                                        src={photo.photo}
                                    />
                                </Col>
                            ) )
                        }
                    </Row>
                </div>
            </div>
            <div className="product__info">
                <div className="title">
                    <h1>{`${plant.genre} ${plant.species}`}</h1>
                    <span>COD: {plant[ '_id' ]}</span>
                </div>
                <div className="price">
                    <div><span className="currency">COP$</span>
                        <span> {checkPricePlantForDetail( discountCollector, priceCollector, discountWholesale, priceWholesale, isWholesaleUser, screenName )}</span>
                    </div>

                </div>
                <div className="variant">
                    <h3>CONSERVACIÓN</h3>
                    <span className="conservation-detail"> {checkConservation( plant.conservation, 30 )}</span>
                </div>
                <div className="description">
                    <h3>DESCRIPCIÓN</h3>
                    <ul>
                        <li>Categoría: <span>{checkCategory( plant.category, 18 )}</span></li>
                        <li>Familia: <span className='description-detail'> {plant.family}</span></li>
                        <li>Característica: <span className='description-detail'>{plant.specialFeature} </span></li>
                        <li className='plant-size-detail'>Tamaño: {
                            screenName === WHOLESALE || ( screenName === NEW_PLANTS && plant.sizeCollector.length === 0 ) ?
                                plant.sizeWholesale.map( ( size, index ) => (
                                    <span className='size-detail'
                                          style={{ border: size.border }}
                                          key={size.size}
                                          onClick={() => switchSelectedPhoto( index + 1, index )}
                                          onKeyDown={() => switchSelectedPhoto( index + 1, index )}>
                                {size.size}
                            </span>
                                ) ) :
                                plant.sizeCollector.map( ( size, index ) => (
                                    <span className='size-detail'
                                          style={{ border: size.border }}
                                          key={size.size}
                                          onClick={() => switchSelectedPhoto( index + 1, index )}
                                          onKeyDown={() => switchSelectedPhoto( index + 1, index )}>
                                {size.size}
                            </span>
                                ) )
                        }</li>
                        {isWholesaleUser && screenName === WHOLESALE &&
                            <li>Orden Mínima (MOQ): <span className='description-detail'> {minOrderQuantity}</span></li>
                        }
                        {isWholesaleUser && screenName === WHOLESALE &&
                            <li>Orden Máxima (MXOQ): <span className='description-detail'> {maxOrderQuantity}</span>
                            </li>

                        }
                    </ul>
                </div>
                <Button className="buy--btn"
                        disabled={checkForSoldOutAndNewItem !== SOLD_OUT || screenName !== WHOLESALE}>
                    Agregar al Carrito</Button>
            </div>
        </Flex>
    );
};

DetailProductScreen.propTypes = {
    screenName: PropTypes.string.isRequired,
    isWholesaleUser: PropTypes.bool.isRequired
};

export default DetailProductScreen;
