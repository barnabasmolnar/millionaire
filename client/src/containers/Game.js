import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { submitGuess, useLifeline, cashOut } from "../actions";

const Game = () => <div />;

const mapStateToProps = ({ gameState: { questions, currentQuestionNum } }) => ({
    question: questions[currentQuestionNum]
});
const mapDispatchToProps = dispatch =>
    bindActionCreators({ submitGuess, useLifeline, cashOut }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
