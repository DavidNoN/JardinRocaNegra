import { checkingCredentials, signIn, signOut } from "./authSlice";
import { signInEmailPassword, signUpUser } from "../../services/AuthService";


export const startSignIn = ( email, password ) => {

    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInEmailPassword( email, password );

        if ( !result.ok ) {
            return dispatch( signOut( result ) );
        }

        localStorage.setItem('x-token', result.token);
        localStorage.setItem('x-token-init-date', new Date().getTime());
        return dispatch( signIn( result ) );
    }
}

export const startSignUp = ( name, password, email, phone ) => {

    return async ( dispatch ) => {

        const result = await signUpUser( name, password, email, phone );

        if ( !result.ok ) {
            return result;
        }

        return await dispatch( startSignIn( result.email, password ) );
    }

}
