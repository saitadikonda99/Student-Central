import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './studentApp.css';

import Sidebar from './components/sidebar/page';
import Topnav from './components/topnav/page';
import Footer from './components/footer/page';
import StudentHome from './pages/home/page';
import StudentProfile from './pages/profile/page';
import StudentClubRegistration from './pages/club/Registration';
import StudentViewRegistration from './pages/club/ViewReg';
import StudentViewLog from './pages/log/page';

const StudentApp = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='student-app'>

      <div className="student-app-topnav">
        <Topnav />
        <button className='openAndCloseButton' onClick={toggleSidebar} >
          {isSidebarOpen ? '<' : '>'}
        </button>
      </div>
      <div className="student-app-in">
        {isSidebarOpen && (
          <div className={`student-app-one ${isSidebarOpen ? '' : 'closed'}`}>
            <Sidebar />
          </div>
        )}
        <div className={`student-app-two ${isSidebarOpen ? '' : 'expanded'}`}>
          <Routes>
            <Route path='/' element={<StudentHome/>}></Route>
            <Route path='/profile' element={<StudentProfile/>}></Route>
            <Route path='/clubregistration' element={<StudentClubRegistration/>}></Route>
            <Route path='/viewregistration' element={<StudentViewRegistration/>}></Route>
            <Route path='/viewlog' element={<StudentViewLog/>}></Route>
          </Routes>
        </div>
      </div>
      <div className="student-app-footer">
        <Footer />
      </div>
    </div>
  )
}

export default StudentApp