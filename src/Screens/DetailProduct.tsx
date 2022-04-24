import React, { useCallback, useEffect, useState } from 'react';
import '../Styles/DetailProduct.scss'
import { useParams } from "react-router-dom";
import plantList from '../data/plants.json';
import { IPlant } from "../Interfaces/IPlant";
import { currencyFormat } from "../Utils/PipesNumber";

import { FaCloudSun, FaMoon, FaSun } from 'react-icons/fa'
import '../Styles/Popover.scss';
import { useWindowSize } from "../Hooks/useWindowSize";
import Carousel from "./Carousel";
import { OverlayTrigger } from "react-bootstrap";
import { popover } from "../Components/Popover";


const MyComponent = () => {

    const { plantId } = useParams();

    const [ mainImg, setMainImg ] = useState<string>( '' );

    const [ plantDetail, setPlantDetail ] = useState<IPlant>( {
        "discount-wholesale": 0,
        "price-collector": 0,
        "price-wholesale": 0,
        cultivation: [],
        description: "",
        discount: 0,
        id: 0,
        name: "",
        photos: [],
        publishDate: "",
        quantity: 0,
        rating: 0,
        size: [],
        wholesale: false,
        state: true
    } );

    const getPlantDesc = useCallback(
        () => {
            setPlantDetail( plantList.filter( plant => plant.id.toString() === plantId?.toString() )[0] );

            setMainImg( plantDetail.photos[0] );
        },
        [ setPlantDetail, plantId, plantDetail.photos ],
    );


    const changeBetweenImg = ( event: string ) => {
        setMainImg( event )
    }

    useEffect( () => {
        getPlantDesc();

    }, [ getPlantDesc, setPlantDetail ] );

    const windowDimensions = useWindowSize();

    return (
        <div className="super_container">
            <div className="single_product">
                <div className="container-fluid" style={ { backgroundColor: "fff", padding: "11px" } }>
                    <div className="row">
                        {
                            windowDimensions.width > 942 ?
                                <>
                                    <div className="col-lg-2 order-lg-1 order-2">
                                        <ul className="image_list">
                                            {
                                                plantDetail.photos.map( ( photo, index ) =>
                                                    <li data-image={ `assets/${ photo }` } key={ index }
                                                        onClick={ () => changeBetweenImg( photo ) }>
                                                        <img
                                                            src={ `assets/${ photo }.png` }
                                                            loading="lazy"
                                                            alt="photoPlant"/>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                    <div className="col-lg-4 order-lg-2 order-1">
                                        <div className="image_selected"><img
                                            src={ `assets/${ mainImg }.png` }
                                            loading="lazy"
                                            alt=""/>
                                        </div>
                                    </div>
                                </> :
                                <Carousel plantPhotos={ plantDetail.photos }/>
                        }
                        <div className="col-lg-6 order-3">
                            <div className="product_description">
                                <div className="product_name">
                                    { plantDetail.name }
                                </div>
                                <div>
                                    <span
                                        className="product_price">{ currencyFormat( plantDetail["price-collector"] * ( 1 - plantDetail.discount ) ) }
                                    </span>
                                    {
                                        plantDetail.discount > 0 && <del className="product_discount">
                                        <span
                                            style={ { color: 'black' } }>{ currencyFormat( plantDetail["price-collector"] ) }
                                        </span>
                                        </del>
                                    }
                                </div>
                                {
                                    plantDetail.discount > 0 &&
                                    <div>
                                        <span className="product_saved mx-1">Te ahorras:</span>
                                        <span style={ { color: 'black' } }>
                                            { currencyFormat( plantDetail["price-collector"] - plantDetail["price-collector"] * ( 1 - plantDetail.discount ) ) }
                                        </span>
                                    </div>
                                }
                                <hr className="singleline"/>
                                <div>
                                    <span className="product_info">
                                    { plantDetail.description }
                                </span>
                                </div>
                                <div>
                                    <div className="row">
                                        <div className="col-md-5">
                                            <span className="break-all fw-bold">
                                                Familia:
                                            </span>
                                            <br/>
                                            <span className="break-all fw-bold">
                                                Genero:
                                            </span>
                                            <br/>
                                            <span className="break-all fw-bold">
                                                Tamaño: <span
                                                className="break-all fw-light"> { plantDetail.size[0] } </span>
                                            </span>
                                            <br/>
                                            <span className="break-all fw-bold">
                                                Cultivo: <span className="break-all fw-light"> {
                                                plantDetail.cultivation.map( ( growing, index ) =>
                                                    <OverlayTrigger trigger="click" placement="right"
                                                                    key={ index }
                                                                    overlay={ popover(
                                                                        growing === 'full sun' ? "Sol" : ( growing === "shade" ? "Sombra" : "Semi-sombra" ),
                                                                        growing === 'full sun' ? [ "Esta planta sobrevive largas horas de",
                                                                                <strong> exposición solar </strong> ] :
                                                                            ( growing === "shade" ? [ "Esta planta sobrevive en ",
                                                                                        <strong>sombra</strong>, " con muy buena ",
                                                                                        <strong>sombra</strong>, " iluminación" ] :
                                                                                    [ "Esta planta sobrevive algunas horas de",
                                                                                        <strong> exposicion
                                                                                            solar</strong>, " y otras de ",
                                                                                        <strong>sombra</strong>, " con buena ",
                                                                                        <strong>iluminación</strong> ]
                                                                            ) ) }
                                                    >
                                                        <button key={ index }>
                                                            { growing === 'full sun' ?
                                                                <FaSun

                                                                    style={ {
                                                                        color: '#FFCF01',
                                                                        fontSize: '20px',
                                                                        marginRight: '0.5rem'
                                                                    } }
                                                                >
                                                                </FaSun>
                                                                :
                                                                ( growing === 'light shade' ?
                                                                        <FaCloudSun style={ {
                                                                            color: '#008EF7',
                                                                            fontSize: '20px',
                                                                            marginRight: '0.5rem'
                                                                        } }/> :
                                                                        <FaMoon style={ { fontSize: '16px' } }/>
                                                                ) }
                                                        </button>
                                                    </OverlayTrigger>
                                                ) }
                                            </span>
                                            </span>
                                            <br/>
                                            <span className="break-all fw-bold">
                                                Riego:
                                            </span>
                                            <br/>
                                            <span className="break-all fw-bold">
                                                Sustrato:
                                            </span>
                                            <br/>
                                        </div>
                                        <div className="col-md-7"/>
                                    </div>
                                </div>
                                <hr className="singleline"/>
                            </div>
                        </div>
                    </div>
                    {/*<div className="row row-underline">*/ }
                    {/*    <div className="col-md-6"><span className=" deal-text">Combo Offers</span></div>*/ }
                    {/*    <div className="col-md-6"><a href="#" data-abc="true">*/ }
                    {/*        <span className="ml-auto view-all"/> </a></div>*/ }
                    {/*</div>*/ }
                    {/*<div className="row">*/ }
                    {/*    <div className="col-md-5">*/ }
                    {/*        <div className="row padding-2">*/ }
                    {/*            <div className="col-md-5 padding-0">*/ }
                    {/*                <div className="bbb_combo">*/ }
                    {/*                    <div className="bbb_combo_image"><img className="bbb_combo_image"*/ }
                    {/*                                                          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924153/alcatel-smartphones-einsteiger-mittelklasse-neu-3m.jpg"*/ }
                    {/*                                                          alt=""/></div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start">*/ }
                    {/*                        <del*/ }
                    {/*                            style={ { color: 'red' } }> <span className="fs-10"*/ }
                    {/*                                                              style={ { color: 'black' } }>₹ 32,000</span>*/ }
                    {/*                        </del>*/ }
                    {/*                        <span className="ml-auto">*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/></span></div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start"*/ }
                    {/*                         style={ { marginBottom: "13px" } }>*/ }
                    {/*                        <span style={ { marginTop: "-4px" } }>₹30,000</span>*/ }
                    {/*                        <span className="ml-auto fs-10">23 Reviews</span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*            <div className="col-md-2 text-center"><span className="step">+</span></div>*/ }
                    {/*            <div className="col-md-5 padding-0">*/ }
                    {/*                <div className="bbb_combo">*/ }
                    {/*                    <div className="bbb_combo_image">*/ }
                    {/*                        <img className="bbb_combo_image"*/ }
                    {/*                             src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924153/alcatel-smartphones-einsteiger-mittelklasse-neu-3m.jpg"*/ }
                    {/*                             alt=""/>*/ }
                    {/*                    </div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start">*/ }
                    {/*                        <del*/ }
                    {/*                            style={ { color: "red" } }> <span className="fs-10"*/ }
                    {/*                                                              style={ { color: "black" } }>₹ 32,000</span>*/ }
                    {/*                        </del>*/ }
                    {/*                        <span className="ml-auto">*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                        </span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start"*/ }
                    {/*                         style={ { marginBottom: "13px" } }><span*/ }
                    {/*                        style={ { marginBottom: "-4px" } }>₹30,000</span>*/ }
                    {/*                        <span className="ml-auto fs-10">23 Reviews</span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*        </div>*/ }
                    {/*        <div className="row">*/ }
                    {/*            <div className="col-xs-12" style={ { marginLeft: "36px" } }>*/ }
                    {/*                <div className="boxo-pricing-items">*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">1 Item</span>*/ }
                    {/*                        <span className="combo_item_price">₹13,200</span></div>*/ }
                    {/*                    <div className="combo-plus"><span className="plus-sign">+</span></div>*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">1 Add-on</span>*/ }
                    {/*                        <span className="combo_item_price">₹500</span></div>*/ }
                    {/*                    <div className="combo-plus"><span className="plus-sign">=</span></div>*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">Total</span>*/ }
                    {/*                        <span className="combo_item_price">₹13,700</span></div>*/ }
                    {/*                    <div className="add-both-cart-button">*/ }
                    {/*                        <button type="button" className="btn btn-primary shop-button">Add to*/ }
                    {/*                            Cart*/ }
                    {/*                        </button>*/ }
                    {/*                    </div>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*        </div>*/ }
                    {/*    </div>*/ }
                    {/*    <div className="col-md-2 text-center"><span className="vertical-line"/></div>*/ }
                    {/*    <div className="col-md-5" style={ { marginLeft: "-27px" } }>*/ }
                    {/*        <div className="row padding-2">*/ }
                    {/*            <div className="col-md-5 padding-0">*/ }
                    {/*                <div className="bbb_combo">*/ }
                    {/*                    <div className="bbb_combo_image"><img className="bbb_combo_image"*/ }
                    {/*                                                          src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924153/alcatel-smartphones-einsteiger-mittelklasse-neu-3m.jpg"*/ }
                    {/*                                                          alt=""/></div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start">*/ }
                    {/*                        <del style={ { color: "red" } }>*/ }
                    {/*                            <span className="fs-10" style={ { color: "black" } }>₹ 32,000</span>*/ }
                    {/*                        </del>*/ }
                    {/*                        <span className="ml-auto">*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                        </span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start"*/ }
                    {/*                         style={ { marginBottom: "13px" } }><span*/ }
                    {/*                        style={ { marginTop: "-4px" } }>₹30,000</span>*/ }
                    {/*                        <span className="ml-auto fs-10">23 Reviews</span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*            <div className="col-md-2 text-center"><span className="step">+</span></div>*/ }
                    {/*            <div className="col-md-5 padding-0">*/ }
                    {/*                <div className="bbb_combo">*/ }
                    {/*                    <div className="bbb_combo_image">*/ }
                    {/*                        <img className="bbb_combo_image"*/ }
                    {/*                             src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1560924153/alcatel-smartphones-einsteiger-mittelklasse-neu-3m.jpg"*/ }
                    {/*                             alt=""/>*/ }
                    {/*                    </div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start">*/ }
                    {/*                        <del style={ { color: "red" } }> <span className="fs-10"*/ }
                    {/*                                                               style={ { color: "black" } }>₹ 32,000</span>*/ }
                    {/*                        </del>*/ }
                    {/*                        <span className="ml-auto"><i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/>*/ }
                    {/*                            <i className="fa fa-star p-rating"/></span></div>*/ }
                    {/*                    <div className="d-flex flex-row justify-content-start"*/ }
                    {/*                         style={ { marginBottom: "13px" } }>*/ }
                    {/*                        <span style={ { marginTop: "-4px" } }>₹30,000</span>*/ }
                    {/*                        <span className="ml-auto fs-10">23 Reviews</span>*/ }
                    {/*                    </div>*/ }
                    {/*                    <span>Acer laptop with 10GB RAM + 500 GB Hard Disk</span>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*        </div>*/ }
                    {/*        <div className="row">*/ }
                    {/*            <div className="col-xs-12" style={ { marginLeft: "36px" } }>*/ }
                    {/*                <div className="boxo-pricing-items">*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">1 Item</span>*/ }
                    {/*                        <span className="combo_item_price">₹13,200</span></div>*/ }
                    {/*                    <div className="combo-plus"><span className="plus-sign">+</span></div>*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">1 Add-on</span>*/ }
                    {/*                        <span className="combo_item_price">₹500</span></div>*/ }
                    {/*                    <div className="combo-plus"><span className="plus-sign">=</span></div>*/ }
                    {/*                    <div className="combo-pricing-item"><span*/ }
                    {/*                        className="items_text">Total</span>*/ }
                    {/*                        <span className="combo_item_price">₹13,700</span></div>*/ }
                    {/*                    <div className="add-both-cart-button">*/ }
                    {/*                        <button type="button" className="btn btn-primary shop-button">Add to*/ }
                    {/*                            Cart*/ }
                    {/*                        </button>*/ }
                    {/*                    </div>*/ }
                    {/*                </div>*/ }
                    {/*            </div>*/ }
                    {/*        </div>*/ }
                    {/*    </div>*/ }
                    {/*</div>*/ }
                </div>
            </div>
        </div>
    );
};

export default MyComponent;
