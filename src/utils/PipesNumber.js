import React from 'react';
export const currencyFormat = (num) => {
    return <span> {'$' + num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )} </span>
}

export const currencyFormatWithDiscount = (num, discount) => {
    return <span><span className='price-line-through' style={{textDecoration: 'line-through'}}>{'$' + num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</span>&nbsp;
        <span>{'$' + (num * (1-discount)).toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</span></span>
}

export const discountFormat = (num) => {
    return <span>{`-${num * 100}%`} </span>;
}
