import {Component} from "react";
import {Link} from "react-router-dom";
import React from "react";

class Urllink_class extends Component{
    render() {
        if (this.props.name == 'Home Page' || this.props.name == 'Home' ) {
            return (
                <Link to="/">
                    {`/${this.props.name}/`}
                </Link>
            );
        } else if (this.props.name == "Favourites") {
            return (
                <Link to="/cart">
                    {`/${this.props.name}/`}
                </Link>
            );
        } else if (this.props.name == "Cart") {
            return (
                <Link to="/cart">
                    {`/${this.props.name}/`}
                </Link>
            );

        } else if (this.props.name == "Rent Gears") {
            return (
                <Link to="/rentgear">
                    {`/${this.props.name}/`}
                </Link>
            );

        }else {
            return (
                <Link to={`/rentgear/${this.props.name}`}>
                    {`/${this.props.name}/`}
                </Link>
            );
        }
    }
}
export default Urllink_class;