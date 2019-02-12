import axios from "axios";

// ========================
// Get a list of categories
// ========================
export const getCategories = () =>
    axios
        .get("https://opentdb.com/api_category.php")
        .then(({ data }) => data.trivia_categories);

// =================
// API config object
// =================
const opentdbConfig = {
    baseUrl: "https://opentdb.com/api.php",
    difficulties: ["easy", "medium", "hard"],
    questionPerDifficulty: 5,
    typeOfQuestion: "multiple",
    catStr: "&category="
};

// ========================================
// Generate URLs based on API config object
// ========================================
function getURLs(category = null, config = opentdbConfig) {
    const {
        baseUrl,
        difficulties,
        questionPerDifficulty,
        typeOfQuestion,
        catStr
    } = config;

    return difficulties.map(
        difficulty =>
            `${baseUrl}?amount=${questionPerDifficulty}${
                category !== null ? catStr + category : ""
            }&difficulty=${difficulty}&type=${typeOfQuestion}`
    );
}

// ===========================================
// Extract relevant data from an API response
// Should we need to test this function
// independently, we just wrap the results.map
// part of the code with a Promise.resolve
// ===========================================
function extractRelevantData({ response_code, results }) {
    return response_code === 1
        ? Promise.reject(
              "There aren't enough questions for this category, sorry. :("
          )
        : results.map(questionObj => ({
              question: questionObj.question,
              correctAnswer: questionObj.correct_answer,
              incorrectAnswers: questionObj.incorrect_answers,
              sortedAnswers: [
                  questionObj.correct_answer,
                  ...questionObj.incorrect_answers
              ].sort()
          }));
}

// =======================================
// Make the requests and get the questions
// =======================================
export function getQuestions(category) {
    const urls = getURLs(category);
    return Promise.all(
        urls.map(url =>
            axios.get(url).then(response => extractRelevantData(response.data))
        )
    ).then(values => [].concat(...values));
}
