import { CARNIVOROUS, COLLECTOR, NEW_PLANTS, WHOLESALE } from "../Constants/Constants";


export const getNameByPathname = ( pathname ) => {

    switch ( pathname ) {
        case '/collection-plants':
            return 'Plantas de Colección';
        case '/carnivorous-plants':
            return 'Plantas Carnívoras'
        case '/wholesale-plants':
            return 'Al por Mayor'
        case '/new-plants':
            return 'Lo Nuevo'
        case '/other-products':
            return 'Otros Productos'
        default:
            return '';
    }

}

export const getTypeUserAndScreenToRoute = ( screen, priceCollector ) => {
    if ( screen === NEW_PLANTS && priceCollector ) {
        return { typeUser: 'collector', screen: 'new_plants' }
    }
    if ( screen === NEW_PLANTS && !priceCollector ) {
        return { typeUser: 'wholesale', screen: 'new_plants' }
    }

    if ( screen === COLLECTOR ) {
        return { typeUser: 'collector', screen: COLLECTOR.toLocaleLowerCase() }
    }

    if ( screen === CARNIVOROUS ) {
        return { typeUser: 'collector', screen: CARNIVOROUS.toLocaleLowerCase() }
    }

    if ( screen === WHOLESALE ) {
        return { typeUser: 'wholesale', screen: 'wholesale' }
    }

}
