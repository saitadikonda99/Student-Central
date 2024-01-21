import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import Nav from './components/nav/page';
import Footer from './components/footer/page';

import Home from './pages/home/page';

import RequiredAuth from './components/auth/RequireAuth';

import Login from './pages/auth/login/Login';
import Register from './pages/auth/registration/page';
import PersistLogin from './components/auth/PersistLogin';
import StudentApp from './user_modules/student/studentApp';

import Layout from './components/auth/Layout';

function App() {

  return (
   <div className="App">
      {/* <Nav/> */}
      <Routes>
        

            <Route path='/' element={<Layout/>}>
              <Route element={<PersistLogin/>}>


                  <Route element={<RequiredAuth allowedRoles={['Student']}/>}>
                    <Route path='/student' element={<StudentApp/>}/>
                  </Route>

                  <Route path='/' element={<Home/>}/>
                  <Route path='/auth/login' element={<Login/>}/>
                  <Route path='/auth/register' element={<Register/>}/>
              </Route>
            </Route>

            
      </Routes>
      {/* <Footer/> */}
   </div>
  )
}

export default App
