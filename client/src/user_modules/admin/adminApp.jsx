import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/page'
import Sidebar from './components/sidebar/page'
import AdminHome from './pages/Home/page'
import Registration from './pages/Registrations/page'
import './adminApp.css';



const AdminApp = () => {

    
  return (
        <div className="AdminComponent">
            <div className="AdminComponent-in">
                <div className="Admin-Nav">
                    <NavBar />
                </div>
                <div className="AdminComponent-one">
                    <div className="AdminComponent-one-one">
                        <Sidebar />
                    </div>
                    <div className="AdminComponent-one-two">
                        <Routes>
                            <Route path='/' element={<AdminHome/>}></Route>
                            <Route path='/viewregistration' element={<Registration/>}></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default AdminApp