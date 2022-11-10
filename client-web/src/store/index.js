import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

let initialState = {
  classes: [],
  oneClass: [],
  oneClassStudents: [],
  subjects: [],
  teachers: [],
  schedules: [],
  contacts: {},
  user: {},
  isLogin: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "status/login":
      return {
        ...state,
        isLogin: action.payload,
      };
    case "classes/fetchSuccess":
      return {
        ...state,
        classes: action.payload,
      };
    case "subjects/fetchSuccess":
      return {
        ...state,
        subjects: action.payload,
      };
    case "teachers/fetchSuccess":
      return {
        ...state,
        teachers: action.payload,
      };
    case "oneClass/fetchSuccess":
      return {
        ...state,
        oneClass: action.payload,
      };
    case "oneClassStudents/fetchSuccess":
      return {
        ...state,
        oneClassStudents: action.payload,
      };
    case "contacts/fetch":
      return {
        ...state,
        contacts: action.payload,
      };
    case "user/fetch":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
  return state;
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
