import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { submitGuess, useLifeline, cashOut } from "../actions";
import {
    FIFTY_FIFTY,
    MAX_FIFTY_FIFTIES,
    fiftyFiftiesUsed
} from "../utils/gameLogic";

const Game = props => {
    const [selectedAnswer, setAnswer] = useState("");

    const submitAnswer = e => {
        e.preventDefault();
        props.submitGuess(selectedAnswer);
    };

    return (
        <div className="container">
            <div>{props.question.question}</div>
            <div>
                <form className="px-12" onSubmit={submitAnswer}>
                    {props.question.sortedAnswers.map((answer, idx) => (
                        <div className="my-4" key={idx}>
                            <input
                                type="radio"
                                name="answer"
                                id={idx}
                                disabled={
                                    props.question.halvedAnswers &&
                                    !props.question.halvedAnswers.includes(
                                        answer
                                    )
                                }
                                checked={selectedAnswer === answer}
                                onChange={() => setAnswer(answer)}
                            />
                            <label
                                className="btn btn-grey block text-center break-words overflow-hidden"
                                htmlFor={idx}
                            >
                                {answer}
                            </label>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-grey block">
                        Submit Answer
                    </button>
                </form>
            </div>
            <div>
                <button
                    className="btn btn-grey block"
                    onClick={() => props.cashOut()}
                >
                    Cash out
                </button>
            </div>
            <div className="sm:flex justify-between py-6 text-sm -mx-4">
                {[...Array(MAX_FIFTY_FIFTIES).keys()].map(i => (
                    <div className="my-4 sm:my-0 px-4 flex-1" key={i}>
                        <button
                            className="w-full btn btn-grey-light py-3 px-5 rounded-full focus:outline-none focus:shadow-outline"
                            onClick={() => props.useLifeline(FIFTY_FIFTY)}
                            disabled={
                                props.question.halvedAnswers ||
                                i < props.fiftyFiftiesUsed
                            }
                        >
                            <div className="bg-grey-lightest rounded-full mr-2 w-8 h-8 inline-flex justify-center items-center">
                                <i className="fas fa-percentage text-grey-dark" />
                            </div>
                            <span className="text-xs md:text-sm">50/50</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = ({ gameState: { questions, currentQuestionNum } }) => ({
    question: questions[currentQuestionNum],
    fiftyFiftiesUsed: fiftyFiftiesUsed(questions)
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ submitGuess, useLifeline, cashOut }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
