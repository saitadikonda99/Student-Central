import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import Nav from './components/nav/page';
import Footer from './components/footer/page';

import Home from './pages/home/page';

function App() {

  return (
   <div className="App">
      <Nav/>
      <Routes>
          <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
   </div>
  )
}

export default App
