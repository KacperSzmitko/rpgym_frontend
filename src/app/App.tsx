import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../common/HomePage'
import LoginPage from '../features/auth/LoginPage'
import MuscleLevels from '../features/muscleLevels/MuscleLevels'
import ModulesListing from '../features/trainModules/ModulesPage'
import PlansListing from '../features/plans/PlansPage'
import TrainStart from '../features/train/TrainStart'

function App () {
  return (
    <div className="app" id="main_window">
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route
            path="/"
            element={
              <div>
                <MuscleLevels />
                <TrainStart />
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
          <Route
            path="/plans"
            element={
              <div>
                <PlansListing />
              </div>
            }
          ></Route>
          <Route path="*" element={<div></div>}></Route>
        </Route>
        <Route path="login" element={<LoginPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
