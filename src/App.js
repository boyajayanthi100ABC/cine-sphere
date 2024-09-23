import './App.css';

import { BrowserRouter, Switch,Route, Routes } from 'react-router-dom';
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
    <BrowserRouter>
    {/* {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated}/>} */}
   
      {/* <Login /> */}
      {/* {isAuthenticated? ( */}
      {/* <Container>  */}
        <Routes>
          <Route path="/login" element={<Login />} exact />
          <Route path="/" element={<ProtectedRoute element={Trending } />} exact/>
          <Route path="/movies" element={<ProtectedRoute element={Movies} />} />
          <Route  path="/series" element={<ProtectedRoute element={Series} />} />
          <Route  path="/search" element={<ProtectedRoute element={Search} />} />
        </Routes>
      {/* </Container> */}
    {/* ) : (<Login setIsAuthenticated={setIsAuthenticated} />) */}
  {/* } */}
    {/* {isAuthenticated && <SimpleBottomNavigation />}  */}
    </ BrowserRouter>
  );
}

export default App; 
