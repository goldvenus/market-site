import { Link } from "react-router-dom";
import React from "react";

const Urllink_class  = (props) => {
    const category = props.name.replace(' ', '');

    if (category === 'HomePage' || category === 'Home' ) {
        return (
            <Link to="/">
                {category}
            </Link>
        );
    } else if (category === "Favourites") {
        return (
            <Link to="/favourites">
                {category}
            </Link>
        );
    } else if (category === "Cart") {
        return (
            <Link to="/cart">
                {category}
            </Link>
        );

    } else if (category === "RentGears") {
        return (
            <Link to="/rentgear">
                {category}
            </Link>
        );

    }else {
        return (
            <Link to={`/rentgear/${category}`}>
                {category}
            </Link>
        );
    }
}

export default Urllink_class;