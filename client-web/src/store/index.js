import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState = {
    classes: [],
  oneClass: [],
    subjects: [],
  teachers: [],
    schedules: [],
  contacts: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "classes/fetchSuccess":
            return {
                ...state,
                classes: action.payload
            };
        case "subjects/fetchSuccess":
            return{
                ...state,
                subjects: action.payload
            };
        case "teachers/fetchSuccess":
            return{
                ...state,
                teachers: action.payload
            };
        case "oneClass/fetchSuccess":
            return{
                ...state,
                oneClass: action.payload
            };
            case "contacts/fetch":
      return {
        ...state,
        contacts: action.payload,
      };
    }
    return state;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
