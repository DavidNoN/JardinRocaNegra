import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    categories: [
        {
            _id: '',
            name: 'Succulents',
            families: []
        },
        {
            _id: '',
            name: 'Cactus',
            families: []
        },
        {
            _id: '',
            name: 'Bulbs',
            families: []
        },
        {
            _id: '',
            name: 'Carnivorous',
            families: []
        },
    ]
}

export const categorySlice = createSlice( {
    name: 'category',
    initialState,
    reducers: {
        categories: ( state, { payload } ) => {
            state.id = payload['_id'];
            state.categories = payload['0'].categories;
        }
    }
} );

export const { categories } = categorySlice.actions
