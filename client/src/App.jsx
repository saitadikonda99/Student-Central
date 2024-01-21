import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import Nav from './components/nav/page';
import Footer from './components/footer/page';

import Home from './pages/home/page';


import Login from './pages/auth/login/Login';
import Register from './pages/registration/page';
import PersistLogin from './components/auth/PersistLogin'
import ClubReg from './pages/club/Registration';
import ViewReg from './pages/club/ViewReg';

function App() {

  return (
   <div className="App">
      <Nav/>
      <Routes>
        
            <Route element={<PersistLogin/>}>
                {/* Require Auth */}
                <Route path='/' element={<Home/>}/>
                <Route path='/auth/login' element={<Login/>}/>
                <Route path='/auth/register' element={<Register/>}/>
                <Route path='/clubRegister' element={<ClubReg/>}/>
                <Route path='/viewReg' element={<ViewReg/>}/>
            </Route>

        </Routes>
      <Footer/>
   </div>
  )
}

export default App
