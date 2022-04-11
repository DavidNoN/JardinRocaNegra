import React from 'react';
import '../index.css';
import '../Styles/Carousel.scss';

const Carousel = ( { plantPhotos }: { plantPhotos: string[] } ) => {

    return (
        <div id="carouselExampleCaptions" className="carousel mb-3" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {
                    plantPhotos.map( ( photo, index ) =>
                        index === 0 ?
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={ index }
                                    className="active"
                                    key={ index }
                                    aria-current="true" aria-label={ `Slide ${ index + 1 }` }/> :
                            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={ index }
                                    key={ index }
                                    aria-current="true" aria-label={ `Slide ${ index + 1 }` }/>
                    )

                }
            </div>
            <div className="carousel-inner">

                { plantPhotos.map( ( photo, index ) =>

                    index === 0 ?
                        <div className="carousel-item active">
                            <img src={ `assets/${ photo }.png` }
                                 className="d-block full-width"
                                 style={ { objectFit: "cover" } } alt="plantPhoto"
                                 key={ index }/>
                        </div> :
                        <div className="carousel-item">
                            <img src={ `assets/${ photo }.png` }
                                 className="d-block full-width"
                                 style={ { objectFit: "cover" } } alt="plantPhoto"
                                 key={ index }/>
                        </div>
                ) }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"/>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"/>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;
