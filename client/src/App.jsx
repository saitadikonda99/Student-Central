import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import Nav from './components/nav/page';
import Footer from './components/footer/page';

import Home from './pages/home/page';


import Login from './pages/auth/login/Login';
import Register from './pages/auth/registration/page';
import PersistLogin from './components/auth/PersistLogin'

function App() {

  return (
   <div className="App">
      {/* <Nav/> */}
      <Routes>
        

            <Route element={<PersistLogin/>}>
                {/* Require Auth */}
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/auth/register' element={<Register/>}/>
            </Route>

            
      </Routes>
      {/* <Footer/> */}
   </div>
  )
}

export default App
