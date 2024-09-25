import './App.css';

import { BrowserRouter, Switch,Route, Routes, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Trending from './components/Pages/Trending/Trending';
import Movies from './components/Pages/Movies/Movies';
import Series from './components/Pages/Series/Series';
import Search from './components/Pages/Search/Search';
import Login from './components/Login/LoginPage/LoginPage';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {

  return (
    <div className="app">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} exact />
          <Route path="/trending" element={<ProtectedRoute element={Trending } exact/>} />
          <Route path="/movies" element={<ProtectedRoute element={Movies} exact/>} />
          <Route  path="/series" element={<ProtectedRoute element={Series} exact/>} />
          <Route  path="/search" element={<ProtectedRoute element={Search} exact/>} />
        </Routes>
    </ BrowserRouter>
     </div>
  );
}

export default App; 
