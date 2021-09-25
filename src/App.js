import "./App.css";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import url from "./Services/axois";

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
