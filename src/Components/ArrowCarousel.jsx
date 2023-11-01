import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import React from "react";
import PropTypes from "prop-types";

const ArrowCarousel = ( {type, onClick} ) => {
    let button;
    button = type === 'left' ?
        <BsChevronLeft color='#FFFFFF' className='carousel-left-arrow' size={20} onClick={onClick}/> :
        <BsChevronRight color='#FFFFFF' className='carousel-right-arrow' size={20} onClick={onClick}/>

    return button;
}

ArrowCarousel.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ArrowCarousel;
