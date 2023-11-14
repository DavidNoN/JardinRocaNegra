import { createSlice } from '@reduxjs/toolkit'

export const AuthStatus = {
    VALIDATING: 'validating',
    AUTHENTICATED: 'authenticated',
    UNAUTHENTICATED: 'unauthenticated'
}

const initialState = {
    status: AuthStatus.VALIDATING,
    id: null,
    name: null,
    email: null,
    phone: null,
    isWholesaleUser: false,
    company: null,
    typeUser: 'user',
    addresses: null,
    ok: null,
    errorMessage: null
}

export const authSlice = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        signIn: ( state, { payload } ) => {
            state.status = AuthStatus.AUTHENTICATED;
            state.id = payload.id;
            state.name = payload.name;
            state.email = payload.email;
            state.phone = payload.phone;
            state.isWholesaleUser = payload.isWholesaleUser;
            state.company = payload.company;
            state.typeUser = payload.typeUser;
            state.addresses = payload.addresses;
            state.ok = payload.ok
            state.errorMessage = null;
        },
        signOut: ( state, { payload } ) => {
            state.status = AuthStatus.UNAUTHENTICATED;
            state.id = null;
            state.name = null;
            state.email = null;
            state.phone = null;
            state.isWholesaleUser = false;
            state.company = null;
            state.typeUser = 'user';
            state.addresses = null;
            state.ok = payload?.ok;
            state.errorMessage = payload?.msg;
        },
        checkingCredentials: ( state ) => {
            state.status = AuthStatus.VALIDATING;
        }
    }
} );

export const { signIn, signOut, checkingCredentials } = authSlice.actions




