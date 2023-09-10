import React from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Navbar from './pages/Navbar';

import './App.css';
import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Ownboard from './pages/Ownboard';

import { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();
export const LanguageContext = createContext();

function App() {
  const [searchtext, setSearchtext] = useState('');
  const [currentlang, setCurrentlang] = useState('jp');
  const islogin = (localStorage.getItem("username") != null)
  console.log(islogin);
  return (
    <SearchContext.Provider value={{ searchtext, setSearchtext }}>
    <LanguageContext.Provider value={{ currentlang, setCurrentlang }}>
      <Routes>
        <Route exact path='/' element={islogin ? <Dashboard /> : <Landing />} />
        <Route exact path='/dashboard' element={islogin ? <Dashboard /> : <Login />} />
        <Route exact path='/own' element={islogin ? <Ownboard /> : <Login />} />
        <Route exact path='/login' element={islogin ? <Dashboard /> : <Login />}/>
        <Route exact path='/register' element={islogin ? <Dashboard /> : <Register />} />
      </Routes>
    </LanguageContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
