import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchCategories } from "./actions";
import HomeScreen from "./components/HomeScreen";
import CategorySelector from "./containers/CategorySelector";

const App = props => (
    <div>
        {props.categories.length > 0 ? (
            <CategorySelector />
        ) : (
            <HomeScreen fetchCategories={props.fetchCategories} />
        )}
    </div>
);

const mapStateToProps = state => ({ categories: state.categories });

const mapDispatchToProps = dispatch =>
    bindActionCreators({ fetchCategories }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
