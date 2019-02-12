import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { compose, applyMiddleware, createStore } from "redux";
import App from "./App";
import reducers from "./reducers";
import thunk from "redux-thunk";
import * as serviceWorker from "./serviceWorker";
import { fetchCategories, fetchQuestions } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// store.dispatch(fetchCategories());
// store.dispatch(fetchQuestions());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
