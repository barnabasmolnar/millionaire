import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchQuestions } from "../actions";

const CategorySelector = props => {
    const categories = [
        { id: "mixed", name: "Mixed categories" },
        ...props.categories
    ];
    const [selectedCategory, setCategory] = useState(categories[0].id);

    return (
        <div className="container">
            <form
                onSubmit={event => {
                    event.preventDefault();
                    props.fetchQuestions(
                        selectedCategory === "mixed" ? null : selectedCategory
                    );
                }}
            >
                <select
                    value={selectedCategory}
                    onChange={event => setCategory(event.target.value)}
                >
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <button className="block w-full my-2 bg-grey p-4" type="submit">
                    Start Game
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({ categories: state.categories });
const mapDispatchToProps = dispatch =>
    bindActionCreators({ fetchQuestions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategorySelector);
