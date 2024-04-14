// Nav.js
import React from "react";
import { Link } from "react-router-dom";

function Nav() {
    const navStyle = {
        color: 'white'
    };

    return (
        <nav>
            <ul className="nav-links">
                <li>
                    <Link style={navStyle} to="/">FrontPage</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/CreateRecipe">CreateRecipe</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/ReadRecipe">ReadRecipe</Link>
                </li>
                <li>
                    <Link style={navStyle} to="/UpdateRecipe">UpdateRecipe</Link>
                </li>
                
            </ul>
        </nav>
    );
}

export default Nav;
