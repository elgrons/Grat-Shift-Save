import ".././App.css";
import React from "react";
import './App.css';
import './styles.css';
import Header from "./Header";
import TipControl from "./TipControl";

function App() {
  return (
    <React.Fragment>
    <div className="App">
      <Header />
        <TipControl />
    </div>
    </React.Fragment>
  );
}

export default App;
