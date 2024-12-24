import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import LaTuaCartella from "./components/LaTuaCartella";

function App() {
  return (
    <>
      <BrowserRouter basename="/prova-tombola-con-redux">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generatoreCartelle" element={<LaTuaCartella />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
