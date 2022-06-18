import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import SortVisualizer from './components/sortVisualizer';
import React from 'react';
import PathVisualizer from './components/PathVisualizer';

function App() {
  return (
    <React.Fragment>
    <ul>
    <li><NavLink to='/sort'>Sort</NavLink></li>
    <li><NavLink to='/path'>Path</NavLink></li>
    </ul>
    <Routes>
      <Route path='/sort' element={<SortVisualizer/>}/>
      <Route path='/path' element={<PathVisualizer/>}/>
    </Routes>
    </React.Fragment>
  );
}

export default App;
