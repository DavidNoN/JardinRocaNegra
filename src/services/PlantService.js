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

export const putPlant = async ( plantObj, plantId ) => {

    try {
        const { data } = await axios.put(
            `${API_URL}/plant/putPlant/${plantId}`,
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

    searchTerm = filterObj ? '' : searchTerm;
    try {
        const { data } = await axios.post(
            `${API_URL}/plant/searchPlants?value=${searchTerm || ''}`,
            buildSearchPlantObj(searchTerm, filterObj, screenName)
        );
        if (!data) {
            return {
                ok: false,
                msg: "No se encontró la planta"
            }
        }
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const findPlantById = async (plantId) => {
    try {
        const { data } = await axios.get(
            `${API_URL}/plant/getPlantById?plantId=${plantId}`,
        );
        if (!data) {
            return {
                ok: false,
                msg: "No se encontró la planta"
            }
        }
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}
