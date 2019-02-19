// Keeping track of what state the game is in at any one time
export const YET_TO_START = "YET_TO_START";
export const IN_PROGRESS = "IN_PROGRESS";
export const HAS_GUESSED_WRONG = "HAS_GUESSED_WRONG";
export const HAS_CASHED_OUT = "HAS_CASHED_OUT";
export const HAS_BECOME_A_MILLIONAIRE = "HAS_BECOME_A_MILLIONAIRE";

// New game state
export const initialGameState = {
    questions: [],
    currentQuestionNum: 0,
    stateOfGame: YET_TO_START
};

// The prize pool
const prizePool = [
    100,
    200,
    300,
    500,
    1000,
    2000,
    4000,
    8000,
    16000,
    32000,
    64000,
    125000,
    250000,
    500000,
    1000000
];

// How many prizes do we have per bracket?
// In other words, every N-th question is a guaranteed prize
export const prizesPerBracket = 5;

// A function that calculates the appropriate prize
// based on the state of the game
export const calculatePrize = (questionNum, stateOfGame) => {
    switch (stateOfGame) {
        case HAS_BECOME_A_MILLIONAIRE:
            return prizePool[prizePool.length - 1];
        case HAS_CASHED_OUT:
            return prizePool[questionNum - 1];
        case HAS_GUESSED_WRONG:
            // some modular arithmetic to help determine the correct guaranteed prize
            const prizeIdx = Math.floor(questionNum / prizesPerBracket) * prizesPerBracket - 1;
            return prizeIdx === -1 ? 0 : prizePool[prizeIdx];
        default:
            return 0;
    }
}