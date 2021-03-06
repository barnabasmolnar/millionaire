// Keeping track of what state the game is in at any one time
export const YET_TO_START = "YET_TO_START"; // *[1]
export const READY_TO_START = "READY_TO_START"; // *[2]
export const IN_PROGRESS = "IN_PROGRESS";
export const HAS_GUESSED_WRONG = "HAS_GUESSED_WRONG";
export const HAS_CASHED_OUT = "HAS_CASHED_OUT";
export const HAS_BECOME_A_MILLIONAIRE = "HAS_BECOME_A_MILLIONAIRE";

// *[1] - Nothing's been really done here yet
// *[2] - Categories have been fetched, player can select categ and start game now

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
            const prizeIdx =
                Math.floor(questionNum / prizesPerBracket) * prizesPerBracket -
                1;
            return prizeIdx === -1 ? 0 : prizePool[prizeIdx];
        default:
            return 0;
    }
};

// Lifeline constants
export const FIFTY_FIFTY = "FIFTY_FIFTY";

// Max number of fifty fifties that can be used**
export const MAX_FIFTY_FIFTIES = 3;

// A function that tells us how many fifty fifties have been used
export const fiftyFiftiesUsed = questions =>
    questions.reduce((n, question) => (question.halvedAnswers ? n + 1 : n), 0);

// ** For now 3 fifty fifties can be used
//    The full lifelines logic will be implemented once we have a working server
//    with the audience polling option being operational
