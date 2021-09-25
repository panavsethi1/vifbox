import "./App.css";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
