

export const getAllCategories = ( categories ) => {
    return categories.map( ( { _id, name } ) => {
        return {
            _id,
            name
        }
    } );
}
export const getAllFamilies = ( categories ) => {
    return categories.flatMap( ( { families } ) =>
        families.map( ( { _id, name } ) => {
            return {
                _id,
                name
            }
        } ) );
}

export const getAllGenres = ( categories ) => {
    return categories.flatMap( ( { families } ) =>
        families.flatMap( ( { genres } ) =>
            genres.map( ( { _id, name } ) => {
                return {
                    _id,
                    name
                }
            } ) ) );
}
