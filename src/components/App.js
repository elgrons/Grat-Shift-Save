import ".././App.css";
import React from "react";
import './../App.css';
import Header from "./Header";
import TipControl from "./TipControl";
import SignIn from "./LogIn";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <React.Fragment>
    <Header />
    <Routes>
      <Route path="/" element={<TipControl />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/register" element={<SignIn />} />
    </Routes>
    </React.Fragment>
  );
}

export default App;
