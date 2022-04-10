import React from 'react';
import '../Styles/PlantCard.scss'
import { IPlant } from "../Interfaces/IPlant";
import { currencyFormat } from "../Utils/PipesNumber";
import { Link } from "react-router-dom";
import { dateDiffInDays } from "../Utils/CalcDiffDays";

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
                        <div className="d-flex justify-content-between">
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
                    <div className="d-flex justify-content-between">
                        <div className="text-decoration-line-through text-muted">
                            Precio Oculto
                        </div>
                    </div>
                )
            }
        } else if ( !wholesale ) {
            if ( discount > 0 ) {
                return (
                    <div className="d-flex justify-content-between">
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
                { calcLastWeekPublished(plant.publishDate) &&  <div className="achievement-label">NUEVO</div> }
                <img src={ `assets/${ plant.photos[0] }.png` } className="card-img-top img-size" alt="..."
                     width="350" height="250"/>
                <div className="card-body">
                    <h5 className="card-title">{ plant.name }</h5>
                    <p className="card-text text-truncate">{ plant.description }</p>
                    <Link to={ `/detail-plant/${ plant.id }` } className="btn btn-primary">Ver Detalle</Link>
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
