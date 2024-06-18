import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import ThreeScene from './pages/threeScene.js';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/three-scene" element={<ThreeScene />} />
      </Routes>
    </div>
  );
}

export default App;
