import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
export const signInEmailPassword = async ( email, password ) => {

    try {
        const { data } = await axios.post(
            `${API_URL}/auth/login`,
            {
                email,
                password: btoa(password)
            }
        );
        return data;
    } catch ( error ) {
        return error.response.data;
    }
}

export const signUpUser = async ( name, password, email, phone ) => {

    try {
        const { data } = await axios.post(
            `${API_URL}/user/newUser`,
            {
                name,
                password,
                email,
                phone,
                isWholesaleUser: false,
                addresses: []
            }
        );
        return data;
    } catch ( error ) {
        return error.response?.data;
    }
}

export const renewToken = async ( uid, name, email ) => {
    try {
        const { data } = await axios.post(
            `${API_URL}/auth/renewToken`,
            {
                uid,
                name,
                email
            },
            {
                headers: {
                    'x-token': localStorage.getItem('x-token')
                }
            }
        );
        return data;
    } catch ( error ) {
        return error.response?.data;
    }
}
