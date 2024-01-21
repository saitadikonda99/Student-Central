import React from 'react'
import { Route, Routes } from 'react-router-dom';
import './studentApp.css';


import Sidebar from './components/sidebar/page';
import Topnav from './components/topnav/page';
import StudentHome from './pages/home/page';
import StudentProfile from './pages/profile/page';
import StudentClubRegistration from './pages/club/Registration';
import StudentViewRegistration from './pages/club/ViewReg';


const studentApp = () => {
  return (
    <div className='student-app'>
      <div className="student-app-topnav">
        <Topnav />
      </div>
      <div className="student-app-in">
        <div className="student-app-one">
          <Sidebar />
        </div>
        <div className="student-app-two">
          <Routes>
            <Route path='/' element={<StudentHome/>}></Route>
            <Route path='/profile' element={<StudentProfile/>}></Route>
            <Route path='/clubregistration' element={<StudentClubRegistration/>}></Route>
            <Route path='/viewregistration' element={<StudentViewRegistration/>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default studentApp