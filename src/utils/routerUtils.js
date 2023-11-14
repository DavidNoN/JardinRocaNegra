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

export const getRouterNameByPathname = ( pathname ) => {
    return pathname.split('/')[1];
};


export const getUriNameByPathname = ( pathname ) => {
    switch ( `/${getRouterNameByPathname(pathname)}` ) {
        case '/collection-plants':
            return 'collection';
        case '/carnivorous-plants':
            return 'carnivorous'
        case '/wholesale-plants':
            return 'wholesale'
        case '/new-plants':
            return 'new'
        case '/other-products':
            return 'other'
        default:
            return '';
    }

}

export const BASIC_ROUTES_ARRAY = ['/collection-plants', '/carnivorous-plants', '/wholesale-plants', '/new-plants', '/other-products'];

export const NO_ROUTE_EFFECT = ['detail-product'];

export const checkIfPathnameHasUid = ( pathname ) => {
    const parts = pathname.split('/');
    if (parts.length > 2) {
        return parts[parts.length - 1];
    }
    return null;
}
