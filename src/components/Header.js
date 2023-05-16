import { React, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { auth } from "./../firebase.js";
import { signOut } from "firebase/auth";
import PropTypes from "prop-types";

const StyledHeader = styled.header`
  width: 100vw;
  max-width: 100vw;
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  background-color: var(--header-color);
  color: white;
  box-shadow: 0 0 1rem #00000099;

  & li {
    width: max-content;
  }

  & > h1 {
    font-size: 2.5rem;
  }

  & > .link-area {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    & a {
      color: unset;
      transition: all 200ms ease;
    }
    
    & a:hover {
      color: pink;
    }

    & button {
      height: 3rem;
      font-size: 1.25rem;
      padding: 0 1rem;
      background-color: maroon;
    }
  }
`;

function Header(props){

  const [signOutSuccess, setSignOutSuccess] = useState(null);
  
  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
        props.handleSettingCurrentUser(null);
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  if(!props.currentUser) {
    return (
      <StyledHeader>
        <div id='title-area'>
        Grat Shift Save
        </div>
        <ul className='link-area'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      </StyledHeader>
    )
  } else {
    return (
      <StyledHeader>
        <div id='title-area'>
        Grat Shift Save
        </div>
        <ul className='link-area'>
          <li>
            <p><Link to="/">Home</Link></p>
          </li>
          <li>
            <Link to="/add-new">Add GratShift</Link>
          </li>
          <li>
            <button onClick={doSignOut}>Sign out</button>
          </li>
        </ul>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
}

export default Header;