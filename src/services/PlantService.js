import axios from "axios";
import { buildSearchPlantObj } from "../utils/plantObjUtils";


const API_URL = process.env.REACT_APP_API_URL;

export const startGetPlants = async ( apiUri ) => {

    try {
        const { data } = await axios.get(
            `${API_URL}/plant${apiUri}`,
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const postPlant = async ( plantObj ) => {

    try {
        const { data } = await axios.post(
            `${API_URL}/plant/postPlant`,
            plantObj
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const addUpdateCategory = async ( categoryObj ) => {

    try {
        const { data } = await axios.put(
            `${API_URL}/category/updateCategories`,
            categoryObj
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const searchForAPlant = async ( searchTerm, filterObj, screenName ) => {

    searchTerm = filterObj.category ? '' : searchTerm;
    try {
        const { data } = await axios.post(
            `${API_URL}/plant/searchPlants?value=${searchTerm || ''}`,
            buildSearchPlantObj(searchTerm, filterObj, screenName)
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}
