import { combineReducers } from "redux";
import { SET_CATEGORIES, START_GAME, SUBMIT_GUESS } from "../actions";

const categories = (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};

const YET_TO_START = "YET_TO_START";
const IN_PROGRESS = "IN_PROGRESS";
const HAS_ENDED = "HAS_ENDED";
const HAS_BECOME_A_MILLIONAIRE = "HAS_BECOME_A_MILLIONAIRE";

const initialGameState = {
    questions: [],
    currentQuestionNum: 0,
    stateOfGame: YET_TO_START
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
            const [questions, currentQuestionNum] = state;
            const isOnLastQuestion =
                questions.length === currentQuestionNum + 1;
            const isCorrect =
                questions[currentQuestionNum].correct_answer === action.guess;

            // Some extra protection against muh wannabe hacker console script kiddies
            if (state.stateOfGame !== IN_PROGRESS) {
                return state;
            }

            if (!isCorrect) {
                return { ...state, stateOfGame: HAS_ENDED };
            } else if (isCorrect && isOnLastQuestion) {
                return { ...state, stateOfGame: HAS_BECOME_A_MILLIONAIRE };
            } else {
                return { ...state, currentQuestionNum: currentQuestionNum++ };
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
