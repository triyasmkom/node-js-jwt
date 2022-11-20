import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import NavBar from "./component/NavBar";

function App() {
  return (
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<><NavBar/><Dashboard/></>} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
