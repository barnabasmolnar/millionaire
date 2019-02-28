import { combineReducers } from "redux";
import {
    SET_CATEGORIES,
    START_GAME,
    SUBMIT_GUESS,
    CASH_OUT,
    USE_LIFELINE
} from "../actions";
import {
    HAS_GUESSED_WRONG,
    HAS_BECOME_A_MILLIONAIRE,
    initialGameState,
    IN_PROGRESS,
    HAS_CASHED_OUT,
    prizesPerBracket,
    FIFTY_FIFTY
} from "../utils/gameLogic";
import { randomElemFromArray } from "../utils/general";

const categories = (state = [], action) => {
    switch (action.type) {
        case SET_CATEGORIES:
            return action.categories;
        default:
            return state;
    }
};

const gameState = (state = initialGameState, action) => {
    const { questions, currentQuestionNum, stateOfGame } = state;

    switch (action.type) {
        case START_GAME:
            return {
                ...initialGameState,
                questions: action.questions,
                stateOfGame: IN_PROGRESS
            };
        case SUBMIT_GUESS:
            const isOnLastQuestion =
                questions.length === currentQuestionNum + 1;
            const isCorrect =
                questions[currentQuestionNum].correct_answer === action.guess;

            // Some extra protection against muh wannabe hacker console script kiddies
            if (stateOfGame !== IN_PROGRESS) {
                return state;
            }

            if (!isCorrect) {
                return { ...state, stateOfGame: HAS_GUESSED_WRONG };
            } else if (isCorrect && isOnLastQuestion) {
                return { ...state, stateOfGame: HAS_BECOME_A_MILLIONAIRE };
            } else {
                return { ...state, currentQuestionNum: currentQuestionNum + 1 };
            }
        case CASH_OUT:
            if (
                stateOfGame === IN_PROGRESS &&
                currentQuestionNum >= prizesPerBracket
            ) {
                return { ...state, stateOfGame: HAS_CASHED_OUT };
            }

            return state;
        case USE_LIFELINE:
            const question = questions[currentQuestionNum];
            if (action.lifeline === FIFTY_FIFTY && !question.halvedAnswers) {
                const halvedAnswers = [
                    question.correctAnswer,
                    randomElemFromArray(question.incorrectAnswers)
                ].sort();

                // return new state
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
