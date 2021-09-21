import "./App.css";
import Routes from "./Routes/Routes";
import { BrowserRouter, HashRouter, Router } from "react-router-dom";

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
