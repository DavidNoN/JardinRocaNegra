import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;

export const startGetPlants = async (param) => {

    let apiUri = '';

    switch ( param ) {
        case 'wholesale':
            apiUri = '/getWholesalePlants';
            break;
        case 'collection':
            apiUri = '/getCollectionPlants';
            break;
        case 'carnivorous':
            apiUri = '/getCarnivorousPlants';
            break;
        case 'new':
            apiUri = '/getNewPlants';
            break;
        default:
            apiUri = '/getAllPlants';
            break;
    }

    try {
        const { data } = await axios.get(
            `${API_URL}/plant${apiUri}`,
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}
