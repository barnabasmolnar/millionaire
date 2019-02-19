import { combineReducers } from "redux";
import { SET_CATEGORIES, START_GAME, SUBMIT_GUESS, CASH_OUT } from "../actions";
import {
    HAS_GUESSED_WRONG,
    HAS_BECOME_A_MILLIONAIRE,
    initialGameState,
    IN_PROGRESS,
    HAS_CASHED_OUT,
    prizesPerBracket
} from "../utils/gameLogic";

const categories = (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};

const gameState = (state = initialGameState, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...initialGameState,
                questions: action.questions,
                stateOfGame: IN_PROGRESS
            };
        case SUBMIT_GUESS:
            let [questions, currentQuestionNum] = state;
            const isOnLastQuestion =
                questions.length === currentQuestionNum + 1;
            const isCorrect =
                questions[currentQuestionNum].correct_answer === action.guess;

            // Some extra protection against muh wannabe hacker console script kiddies
            if (state.stateOfGame !== IN_PROGRESS) {
                return state;
            }

            if (!isCorrect) {
                return { ...state, stateOfGame: HAS_GUESSED_WRONG };
            } else if (isCorrect && isOnLastQuestion) {
                return { ...state, stateOfGame: HAS_BECOME_A_MILLIONAIRE };
            } else {
                return { ...state, currentQuestionNum: currentQuestionNum++ };
            }
        case CASH_OUT:
            if (state.stateOfGame === IN_PROGRESS && state.currentQuestionNum >= prizesPerBracket) {
                return { ...state, stateOfGame: HAS_CASHED_OUT };
            }
        default:
            return state;
    }
};

const reducers = combineReducers({
    categories,
    gameState
});

export default reducers;
