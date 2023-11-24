import { CARNIVOROUS, COLLECTOR, WHOLESALE } from "../constants/Constants";

const completePlantObj =
    {
        category: "",
        family: "",
        genre: "",
        species: "",
        specialFeature: "",
        description: "",
        priceCollector: [ 0 ],
        priceWholesale: [ 0 ],
        discountCollector: [ 0.0 ],
        discountWholesale: [ 0.0 ],
        sizeCollector: [],
        sizeWholesale: [],
        quantity: 0,
        conservation: [],
        minOrder: [ 0 ],
        maxOrder: [ 0 ],
        photos: [],
        publishedDate: ""
    };


export const compareObjects = ( obj1, obj2 = completePlantObj ) => {
    const keys1 = Object.keys( obj1 );
    const keys2 = Object.keys( obj2 );

    keys2.forEach( key => {
        if ( !keys1.includes( key ) ) {
            obj1[ key ] = obj2[ key ];
        }
    } );

    return obj1;
}

export const convertToArrays = ( obj, pattern ) => Object.keys( obj )
    .filter( key => key.includes( pattern ) )
    .map( key => obj[ key ] );

export const isOnlyCollector = ( obj ) => {
    return {
        ...obj,
        priceWholesale: [ 0 ],
        discountWholesale: [ 0.0 ],
        sizeWholesale: [],
        minOrder: [ 0 ],
        maxOrder: [ 0 ],
    }
}

export const isOnlyWholesale = ( obj ) => {
    return {
        ...obj,
        priceCollector: [ 0 ],
        discountCollector: [ 0.0 ],
        sizeCollector: [],
    }
}

export const buildFinalPlantObj = ( obj, priceCollector, discountCollector, priceWholesale, discountWholesale, minOrder, maxOrder ) => {
    return {
        category: obj.category,
        family: obj.family,
        genre: obj.genre,
        species: obj.species,
        specialFeature: obj.specialFeature,
        description: obj.description || '',
        priceCollector: priceCollector.length === 0 ? [ 0 ] : priceCollector.map( price => Number( price ) ),
        priceWholesale: priceWholesale.length === 0 ? [ 0 ] : priceWholesale.map( price => Number( price ) ),
        discountCollector: discountCollector.length === 0 ? [ 0.0 ] : discountCollector.map( discount => Number( discount / 100 ) ),
        discountWholesale: discountWholesale.length === 0 ? [ 0.0 ] : discountWholesale.map( discount => Number( discount / 100 ) ),
        sizeCollector: obj.sizeCollector,
        sizeWholesale: obj.sizeWholesale,
        quantity: obj.quantity,
        conservation: orderedConservation( obj.conservation ),
        minOrder: minOrder.length === 0 ? [ 0 ] : minOrder.map( min => Number( min ) ),
        maxOrder: maxOrder.length === 0 ? [ 0 ] : maxOrder.map( max => Number( max ) ),
        photos: obj.photos.fileList ? obj.photos.fileList.map( photo => photo.thumbUrl ) : obj.photos,
        publishedDate: obj.publishedDate[ '$M' ] ? `${obj.publishedDate[ '$M' ] + 1}/${obj.publishedDate[ '$D' ]}/${obj.publishedDate[ '$y' ]}` : obj.publishedDate
    };

}

export const buildFinalPlantObjForUpdate = ( oldObj, newObj ) => {
    return {
        category: newObj.category,
        family: newObj.family,
        genre: newObj.genre,
        species: newObj.species,
        specialFeature: newObj.specialFeature,
        description: newObj.description || '',
        priceCollector: oldObj.priceCollector,
        priceWholesale: oldObj.priceWholesale,
        discountCollector: oldObj.discountCollector,
        discountWholesale: oldObj.discountWholesale,
        sizeCollector: oldObj.sizeCollector,
        sizeWholesale: oldObj.sizeWholesale,
        quantity: newObj.quantity,
        conservation: orderedConservation( newObj.conservation ),
        minOrder: oldObj.minOrder,
        maxOrder: oldObj.maxOrder,
        photos: oldObj.photos,
        publishedDate: `${newObj.publishedDate[ '$M' ] + 1}/${newObj.publishedDate[ '$D' ]}/${newObj.publishedDate[ '$y' ]}`
    };

}

const orderedConservation = ( conservationArray ) => {
    const customSortOrder = [ 'light-shade', 'sun', 'shade' ];
    return conservationArray.sort( ( a, b ) => {
        const indexOfA = customSortOrder.indexOf( a );
        const indexOfB = customSortOrder.indexOf( b );

        return indexOfA - indexOfB;
    } );
}

export const buildSearchPlantObj = ( searchTerm, searchCriteria, screenName ) => {
    if ( searchTerm ) {
        return {
            searchCriteria: {
                category: null,
                family: null,
                genre: null
            },
            filterCriteria: {
                wholesale: screenName === WHOLESALE ? true : null,
                collector: screenName === COLLECTOR ? true : null,
                carnivorous: screenName === CARNIVOROUS ? true : null,
                all: screenName === 'all' ? true : null
            }
        }
    } else {

        if ( searchCriteria.genre ) {
            searchCriteria.category = null;
            searchCriteria.family = null;
        }

        if ( searchCriteria.family && !searchCriteria.genre ) {
            searchCriteria.category = null;
        }

        return {
            searchCriteria: {
                category: searchCriteria.category,
                family: searchCriteria.family,
                genre: searchCriteria.genre
            },
            filterCriteria: {
                wholesale: screenName === WHOLESALE ? true : null,
                collector: screenName === COLLECTOR ? true : null,
                carnivorous: screenName === CARNIVOROUS ? true : null,
                all: screenName === 'all' ? true : null
            }
        }
    }

}
