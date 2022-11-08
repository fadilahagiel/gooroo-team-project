import {legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let initialState = {
    products: [],
    categories: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "products/fetchSuccess":
            return {
                ...state,
                products: action.payload
            };
        case "categories/fetchSuccess":
            return{
                ...state,
                categories: action.payload
            }
    }
    return state;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;