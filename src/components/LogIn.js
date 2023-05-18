import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate();
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  // let domain = `https://grat-shift-save-api.azurewebsites.net/api/${register}${login}`;

  function doRegister(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const registerPayload = { username, email, password };

    axios
      .post("https://grat-shift-save-api.azurewebsites.net/api/register", registerPayload)
      .then((response) => {
        const token = response.data.authorizationToken;

        localStorage.setItem("token", token);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        setSignUpSuccess(
          `You've successfully signed up, ${email}!`
        );
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`);
      });
  }

  function doLogIn(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const loginPayload = { username, email, password };

    axios
      .post("https://grat-shift-save-api.azurewebsites.net/api/login", loginPayload)
      .then((response) => {
        const token = response.data.token;

        localStorage.setItem("token", token);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        setSignInSuccess(`You've successfully signed in as ${email}!`);
        navigate("/");
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`);
      });
  }

  function doSignOut() {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setSignOutSuccess("You have successfully signed out!");
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      {signUpSuccess}
      <form onSubmit={doRegister}>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign up</button>
      </form>
      <h1>Sign In</h1>
      {signInSuccess}
      <form onSubmit={doLogIn}>
        <input type="text" name="username" placeholder="username" />
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>
      <h1>Sign Out</h1>
      {signOutSuccess}
      <br />
      <button onClick={doSignOut}>Sign out</button>
    </React.Fragment>
  );
}

export default SignIn;