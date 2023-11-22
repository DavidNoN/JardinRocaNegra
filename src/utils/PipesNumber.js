import React from 'react';

export const currencyFormat = ( num ) => {
    return <span className='price-product'> {'$' + num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )} </span>
}

export const currencyFormatWithDiscount = ( num, discount ) => {
    return <span className='price-product'><span className='price-line-through'
                                                 style={{ textDecoration: 'line-through' }}>{'$' + num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</span>&nbsp;
        <span>{'$' + ( num * ( 1 - discount ) ).toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</span></span>
}

export const discountFormat = ( num ) => {
    return <span>{`-${Math.trunc(num * 100) }%`} </span>;
}

export const currencyFormatForDetail = ( num ) => {
    return <span
        className='price-product-detail'> {num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )} </span>
}

export const currencyFormatWithDiscountForDetail = ( num, discount ) => {
    return <span
        className='price-product-detail'>{( num * ( 1 - discount ) ).toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}
    <span className='price-line-through-detail'
          style={{ textDecoration: 'line-through' }}>{'$' + num.toFixed( 0 ).replace( /(\d)(?=(\d{3})+(?!\d))/g, '$1,' )}</span>&nbsp;
        </span>
}
