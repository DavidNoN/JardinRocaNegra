import React from 'react';
import '../Styles/PlantCard.scss'
import { IPlant } from "../Interfaces/IPlant";
import { currencyFormat } from "../Utils/PipesNumber";
import { Link } from "react-router-dom";
import { dateDiffInDays } from "../Utils/CalcDiffDays";
import { OverlayTrigger } from "react-bootstrap";
import { popover } from "./Popover";
import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";

const PlantCard = ( {
                        plant,
                        wholesale,
                        showWholesalePrices
                    }: { plant: IPlant, wholesale: boolean, showWholesalePrices: boolean } ) => {

    const calcPrice = ( price: number, priceWholesale: number, discount: number, discountWholesale: number, wholesale: boolean, showWholesalePrices: boolean ) => {
        if ( wholesale ) {
            if ( showWholesalePrices ) {
                if ( discountWholesale > 0 ) {
                    return (
                        <div className="d-flex justify-content-between flex-wrap-reverse">
                            <div className="text-decoration-line-through text-muted">
                                { currencyFormat( priceWholesale ) }
                            </div>
                            <div>
                                { currencyFormat( priceWholesale * ( 1 - discountWholesale ) ) }
                            </div>
                            <div className="text-success">
                                { discountWholesale * 100 }%
                            </div>
                        </div>
                    )
                } else {
                    return currencyFormat( priceWholesale );
                }
            } else {
                return (
                    <div className="d-flex justify-content-between flex-wrap-reverse">
                        <div className="text-decoration-line-through text-muted">
                            Precio Oculto
                        </div>
                    </div>
                )
            }
        } else if ( !wholesale ) {
            if ( discount > 0 ) {
                return (
                    <div className="d-flex justify-content-between flex-wrap-reverse">
                        <div className="text-decoration-line-through text-muted">
                            { currencyFormat( price ) }
                        </div>
                        <div>
                            { currencyFormat( price * ( 1 - discount ) ) }
                        </div>
                        <div className="text-success">
                            { ( discount * 100 ) }%
                        </div>
                    </div> )
            } else {
                return currencyFormat( price );
            }
        }
    }

    const calcLastWeekPublished = ( date: string ): boolean => {
        const plantDate = new Date( date );
        const currentDate = new Date();
        const diffDays = dateDiffInDays( plantDate, currentDate );
        return diffDays <= 7;
    }

    return (
        <div className="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3 mb-3">
            <div className="card">
                {
                    calcLastWeekPublished( plant.publishDate ) && plant.state ?
                    <div className="achievement-label">NUEVO</div> :
                        <div className="out-stock-label">AGOTADO</div>
                }
                <Link to={ `/detail-plant/${ plant.id }` }>
                    <img src={ `assets/${ plant.photos[0] }.png` } className="card-img-top img-size" alt="planImg"
                         loading="lazy"
                         width="350" height="250"/>
                </Link>
                <div className="card-body">
                    <h5 className="card-title">{ plant.name }</h5>
                    <div className="d-flex flex-column gap-2">
                        <section>
                            <p className="card-text text-truncate">
                                <strong>
                                Descripcion: &nbsp;
                            </strong>{ plant.description }
                            </p>
                        </section>
                        <section>
                            <strong>
                                Cultivo:
                            </strong>
                            <span className="break-all fw-light"> {
                                plant.cultivation.map( ( growing, index ) =>
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
                        </section>
                        <section>
                            <strong>
                                Tamaño: &nbsp;
                            </strong>
                            <span className="break-all fw-light">
                         { plant.size.join( ', ' ) }
                    </span>
                        </section>
                    </div>
                </div>
                <div className="card-footer bg-light border-light fw-bold">
                    {
                        calcPrice( plant["price-collector"], plant[`price-wholesale`], plant.discount, plant[`discount-wholesale`], wholesale, showWholesalePrices )
                    }
                </div>
            </div>
        </div>

    );
};

export default PlantCard;
