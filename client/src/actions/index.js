import { getQuestions, getCategories } from "../helpers/helpers_api";

// Actions constants
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_QUESTIONS = "SET_QUESTIONS";

// Action creators
export const setCategories = categories => ({
    type: SET_CATEGORIES,
    categories
});

export const setQuestions = questions => ({
    type: SET_QUESTIONS,
    questions
});

// Async
export const fetchCategories = () => dispatch =>
    getCategories()
        .then(categories => dispatch(setCategories(categories)))
        .catch(console.error);

export const fetchQuestions = category => dispatch =>
    getQuestions(category)
        .then(questions => dispatch(setQuestions(questions)))
        .catch(console.error);
