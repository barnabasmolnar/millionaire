import { combineReducers } from "redux";
import { SET_CATEGORIES, SET_QUESTIONS } from "../actions";

const categories = (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};

const questions = (state = [], action) => {
    switch (action.type) {
        case SET_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}

const reducers = combineReducers({
    categories,
    questions
});

export default reducers;