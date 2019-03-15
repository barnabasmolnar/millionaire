import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { submitGuess, useLifeline, cashOut } from "../actions";

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
        </div>
    );
};

const mapStateToProps = ({ gameState: { questions, currentQuestionNum } }) => ({
    question: questions[currentQuestionNum]
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ submitGuess, useLifeline, cashOut }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
