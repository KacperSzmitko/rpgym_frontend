import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MuscleLevels from "./components/MuscleLevels";
import ModulesListing from "./components/ModulesListing";

function App() {
  return (
    <div className="app" id="main_window">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route
            path="/"
            element={
              <div>
                <MuscleLevels />
              </div>
            }
          ></Route>
          <Route
            path="/modules"
            element={
              <div>
                <ModulesListing />
              </div>
            }
          ></Route>
          <Route path="*" element={<div></div>}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
