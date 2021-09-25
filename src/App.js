import "./App.css";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import themes from "./Pages/themes";
import Navbar from "./Pages/Navbar";

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
