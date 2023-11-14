import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ok: false,
    msg: '',
    plants: []
};

export const plantSlice = createSlice( {
    name: 'plant',
    initialState,
    reducers: {
        getPlantsScheme: ( state, { payload } ) => {
            state.ok = payload.ok;
            state.msg = payload.msg;
            state.plants = payload.plants;
        },
        postPlant: () => {
        },
        updatePlant: () => {
        }
    }
} );

export const { getPlantsScheme, postPlant, updatePlant } = plantSlice.actions
