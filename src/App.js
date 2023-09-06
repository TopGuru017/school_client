import React from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './pages/Navbar';

import './App.css';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

function App() {
  const [searchtext, setSearchtext] = useState('');
  return (
    <SearchContext.Provider value={{ searchtext, setSearchtext }}>
      <Routes>
        <Route exact path='/' Component={Landing} />
        <Route exact path='/dashboard' Component={Dashboard} />
        <Route exact path='/login' Component={Login} />
        <Route exact path='/register' Component={Register} />
      </Routes>
    </SearchContext.Provider>
  );
}

export default App;
