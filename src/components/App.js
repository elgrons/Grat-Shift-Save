import ".././App.css";
import React, { useState } from 'react';
import './../App.css';
import Header from "./Header";
import TipControl from "./TipControl";
import SignIn from "./LogIn";
import TipForm from "./TipForm";
import { Routes, Route } from "react-router-dom";


function App() {

  const [currentUser, setCurrentUser] = useState(null);

  const handleSettingCurrentUser = (user) => {
    setCurrentUser(user);
  }

  return (
    <React.Fragment>
    <Header 
    // currentUser={currentUser}
    // setCurrentUser={handleSettingCurrentUser}
    />
    <Routes>
      <Route path="/" element={<TipControl />} />
      <Route path="/sign-in" element={<SignIn 
      setCurrentUser={handleSettingCurrentUser}/>}/>
      <Route path="/register" element={<SignIn 
      setCurrentUser={handleSettingCurrentUser}/>}/>
      <Route path="/add-new" element={<TipForm 
      setCurrentUser={handleSettingCurrentUser}/>}/>
    </Routes>
    </React.Fragment>
  );
}

export default App;
