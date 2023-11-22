import axios from "axios";


const API_URL = process.env.REACT_APP_API_URL;


export const startGetCategories = async() => {

    const apiUri = '/category/getCategories';

    try {
        const { data } = await axios.get(
            `${API_URL}${apiUri}`,
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}
