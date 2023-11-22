import { startGetPlants } from "../../services/PlantService";
import { getCarnivorousPlants, getCollectionPlants, getNewPlants, getWholesalePlants } from "./plantSlice";


export const getPlantsThunk = async (dispatch, param) => {

    let apiUri = '';
    let result;

    switch ( param ) {
        case 'wholesale':
            apiUri = '/getWholesalePlants';
            result = await startGetPlants(apiUri);
            await dispatch( getWholesalePlants( result ) );
            break;
        case 'collection':
            apiUri = '/getCollectionPlants';
            result = await startGetPlants(apiUri);
            await dispatch( getCollectionPlants( result ) );
            break;
        case 'carnivorous':
            apiUri = '/getCarnivorousPlants';
            result = await startGetPlants(apiUri);
            await dispatch( getCarnivorousPlants( result ) );
            break;
        case 'new':
            apiUri = '/getNewPlants';
            result = await startGetPlants(apiUri);
            await dispatch( getNewPlants( result ) );
            break;
        default:
            apiUri = '/getAllPlants';
            result = await startGetPlants(apiUri);
            break;
    }

    return result;

}
