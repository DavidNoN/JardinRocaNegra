import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ok: false,
    msg: '',
    wholesalePlants: [],
    collectionPlants: [],
    newPlants: [],
    carnivorousPlants: []
};

export const plantSlice = createSlice( {
    name: 'plant',
    initialState,
    reducers: {
        getNewPlants: (state, {payload}) => {
            state.ok = payload.ok;
            state.msg = payload.msg;
            state.newPlants = payload.plants;
        },
        getWholesalePlants: (state, {payload}) => {
            state.ok = payload.ok;
            state.msg = payload.msg;
            state.wholesalePlants = payload.plants;
        },
        getCollectionPlants: (state, {payload}) => {
            state.ok = payload.ok;
            state.msg = payload.msg;
            state.collectionPlants = payload.plants;
        },
        getCarnivorousPlants: (state, {payload}) => {
            state.ok = payload.ok;
            state.msg = payload.msg;
            state.carnivorousPlants = payload.plants;
        },
    }
} );

export const { getNewPlants, getWholesalePlants, getCarnivorousPlants, getCollectionPlants } = plantSlice.actions
