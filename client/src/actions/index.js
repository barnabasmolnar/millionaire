import { getQuestions, getCategories } from "../helpers/helpers_api";

// Actions constants
export const SET_CATEGORIES = "SET_CATEGORIES";
export const START_GAME = "START_GAME";
export const SUBMIT_GUESS = "SUBMIT_GUESS";

// Action creators
export const setCategories = categories => ({
    type: SET_CATEGORIES,
    categories
});

export const startGame = questions => ({
    type: START_GAME,
    questions
});

export const submitGuess = guess => ({
    type: SUBMIT_GUESS,
    guess
});

// Async
export const fetchCategories = () => dispatch =>
    getCategories()
        .then(categories => dispatch(setCategories(categories)))
        .catch(console.error);

export const fetchQuestions = category => dispatch =>
    getQuestions(category)
        .then(questions => dispatch(startGame(questions)))
        .catch(console.error);
