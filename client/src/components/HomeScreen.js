import React from "react";

const HomeScreen = props => (
    <div className="container">
        <h1>Who wants to be a millionaire?</h1>
        <img src="https://via.placeholder.com/400" alt="Logo" />
        <button
            className="block w-full my-2 bg-grey p-4"
            onClick={props.fetchCategories}
        >
            New Game
        </button>
        <button className="block w-full my-2 bg-grey p-4">High score</button>
        <button className="block w-full my-2 bg-grey p-4">About</button>
    </div>
);

export default HomeScreen;
