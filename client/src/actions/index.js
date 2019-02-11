import axios from "axios";

// Actions constants
export const SET_CATEGORIES = "SET_CATEGORIES";

// Action creators
export const setCategories = categories => ({
    type: SET_CATEGORIES,
    categories
});

// Async
export const fetchCategories = () => dispatch =>
    axios
        .get("https://opentdb.com/api_category.php")
        .then(({ data }) => dispatch(setCategories(data.trivia_categories)));
