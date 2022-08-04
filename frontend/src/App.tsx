import React from "react";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <div className="App bg-dark">
        <header className="App-header">
          <div className="heading">Hello React with TS</div>
        </header>
      </div>
    </>
  );
}

export default App;
