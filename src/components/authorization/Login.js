import { auth } from "./../firebase.js";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function LogIn() {
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignIn(event) {
    event.preventDefault();
    const username = event.target.signinUsername.value;
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, username, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`)
      });
  }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("You have successfully signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
      <h1>Sign In</h1>
      {signInSuccess}
      <form onSubmit={doSignIn}>
      <input type="text" name="signinUserName" placeholder="username" />
        <input type="text" name="signinEmail" placeholder="email" />
        <input type="password" name="signinPassword" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default LogIn