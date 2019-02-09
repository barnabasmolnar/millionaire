import { combineReducers } from "redux";
import { SET_CATEGORIES } from "../actions";

const categories = (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};

const reducers = combineReducers({
    categories
});

export default reducers;