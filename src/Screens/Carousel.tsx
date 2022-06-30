import React, {useEffect, useState} from 'react';
import '../index.css';
import '../Styles/Carousel.scss';
import {Link} from "react-router-dom";

const Carousel = ({plantPhotos}: { plantPhotos: string[] }) => {

    const [indexPicture, setIndexPicture] = useState(0);

    const validateChangePicture = (state: string, index: number) => {
        if (state === 'prev') {
            setIndexPicture(indexPicture - 1);
        } else if (state === 'next' && indexPicture <= plantPhotos.length) {
            setIndexPicture(indexPicture + 1);
        } else if (state === 'indicator') {
            setIndexPicture(index);
        } else {
            return;
        }
    }



    return (
        <div id="carouselExampleCaptions" data-interval="false" className="carousel mb-3 carousel-resize">
            <div className="carousel-indicators">
                {
                    plantPhotos.map((photo, index) =>
                        plantPhotos.length > 1 ?
                            index === indexPicture ?
                                <button type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={indexPicture}
                                        className="active"
                                        onClick={() => validateChangePicture('indicator', index)}
                                        key={index}
                                        aria-current="true"
                                        aria-label={`Slide ${indexPicture + 1}`}/> :
                                <button type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={indexPicture}
                                        onClick={() => validateChangePicture('indicator', index)}
                                        key={index}
                                        aria-current="true"
                                        aria-label={`Slide ${indexPicture + 1}`}/> :
                            <></>
                    )

                }
            </div>
            <div className="carousel-inner">

                {plantPhotos.map((photo, index) =>

                    index === indexPicture ?
                        <div className="carousel-item active">

                            <img src={`assets/${plantPhotos[indexPicture]}.png`}
                                 className="d-block img-height"
                                 style={{objectFit: "cover"}} alt="plantPhoto"
                                 width="350" height="250"
                                 loading="lazy"
                                 key={index}/>
                        </div> :
                        <div className="carousel-item">
                            <img src={`assets/${plantPhotos[indexPicture]}.png`}
                                 className="d-block img-height"
                                 style={{objectFit: "cover"}} alt="plantPhoto"
                                 width="350" height="250"
                                 loading="lazy"
                                 key={index}/>
                        </div>
                )}
            </div>
            {
                plantPhotos.length > 1 &&
                <>
                    {
                        indexPicture > 0 &&
                        <button className="carousel-control-prev"
                                type="button"
                                onClick={() => validateChangePicture('prev', 0)}
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Previous</span>
                        </button>
                    }
                    {
                        indexPicture < plantPhotos.length - 1 &&
                        <button className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                onClick={() => validateChangePicture('next', 0)}
                                data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"/>
                            <span className="visually-hidden">Next</span>
                        </button>
                    }
                </>
            }
        </div>
    );
};

export default Carousel;
