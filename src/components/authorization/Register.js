import { auth } from "./../firebase.js";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";

function Register() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);

function doRegister(event) {
  event.preventDefault();
  const username = event.target.username.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  createUserWithEmailAndPassword(auth, username, email, password)
    .then((userCredential) => {
      setSignUpSuccess(
        `You've successfully signed up, ${userCredential.user.email}!`
      );
    })
    .catch((error) => {
      setSignUpSuccess(`There was an error signing up: ${error.message}!`);
    });
  }

  return (
    <React.Fragment>
      <h1>Register An Account</h1>
      {signUpSuccess}
      <form onSubmit={doRegister}>
      <input type="text" name="username" placeholder="username" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
      <br />
    </React.Fragment>
  );
}

export default Register