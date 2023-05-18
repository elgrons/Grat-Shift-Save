import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Header(props) {
  if (!props.currentUser) {
    return (
      <React.Fragment>
        <div id="title-area">Grat Shift Save</div>
        <ul className="link-area">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Sign In</Link>
          </li>
        </ul>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div id="title-area">Grat Shift Save</div>
        <ul className="link-area">
          <li>
            <p>
              <Link to="/">Home</Link>
            </p>
          </li>
          <li>
            <Link to="/add-new">Add GratShift</Link>
          </li>
          <li>
            <button onClick={props.doSignOut}>Sign out</button>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
  doSignOut: PropTypes.func,
};

export default Header;