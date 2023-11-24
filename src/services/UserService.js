import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getUser = async ( email ) => {

    try {
        const { data } = await axios.get(
            `${API_URL}/user/getUser/${email}`,
        );
        if ( !data ) {
            return {
                ok: false,
                msg: "No se encontró el usuario"
            }
        }
        return data;
    } catch ( error ) {
        return error.response;
    }
}


export const putUser = async ( userId, userObj ) => {

    try {
        const { data } = await axios.put(
            `${API_URL}/user/updateUser/${userId}`,
            userObj
        );
        if ( !data ) {
            return {
                ok: false,
                msg: "No se encontró el usuario"
            }
        }
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const putPasswordAdmin = async ( passwordObj ) => {

    try {
        const { data } = await axios.put(
            `${API_URL}/user/putPasswordAdmin`,
            passwordObj
        );
        if ( !data ) {
            return {
                ok: false,
                msg: "No se encontró el usuario"
            }
        }
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const putPasswordUser = async ( oldPassword, newPassword, userId ) => {
    try {
        const { data } = await axios.put(
            `${API_URL}/user/updatePassword/${userId}`,
            {
                oldPassword,
                newPassword
            }
        );
        if ( !data ) {
            return {
                ok: false,
                msg: "No se encontró el usuario"
            }
        }
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}
