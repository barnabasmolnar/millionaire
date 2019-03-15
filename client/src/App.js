import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchCategories } from "./actions";
import HomeScreen from "./components/HomeScreen";
import CategorySelector from "./containers/CategorySelector";
import { YET_TO_START, IN_PROGRESS, READY_TO_START } from "./utils/gameLogic";
import Game from "./containers/Game";

const renderViewBasedOnState = props => {
    switch (props.stateOfGame) {
        case YET_TO_START:
            return <HomeScreen fetchCategories={props.fetchCategories} />;
        case READY_TO_START:
            return <CategorySelector />;
        case IN_PROGRESS:
            return <Game />;
    }
};

const App = props => <div>{renderViewBasedOnState(props)}</div>;

const mapStateToProps = state => ({
    stateOfGame: state.gameState.stateOfGame
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ fetchCategories }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
