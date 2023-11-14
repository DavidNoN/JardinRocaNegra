import { useDispatch } from "react-redux";
import { signIn, signOut } from "../store/auth/authSlice";
import { renewToken } from "../services/AuthService";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const checkAuthToken = async () => {

        const token = localStorage.getItem( 'x-token' );
        if ( !token ) return removeLocalStorageAndLogout(dispatch);

        try {
            const { uid, name, email } = jwtDecode( token );
            const data = await renewToken( uid, name, email );
            localStorage.setItem( 'x-token', data.token );
            localStorage.setItem( 'x-token-init-date', new Date().getTime() );
            if (!data.ok) {
                return removeLocalStorageAndLogout(dispatch);
            }
            return dispatch( signIn( data ) );
        } catch ( error ) {
            console.log( 'error', error );
            return removeLocalStorageAndLogout(dispatch);
        }
    }

    return {
        checkAuthToken
    }
}

const removeLocalStorageAndLogout = (dispatch) => {
    localStorage.clear();
    return dispatch( signOut() );
}
