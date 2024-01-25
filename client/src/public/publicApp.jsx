import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../components/nav/page'
import Footer from '../components/footer/page'

import LoggedIn from './pages/log/logIn/page'
import LoggedOut from './pages/log/logOut/page'

import './PublicApp.css';


const PublicApp = () => {

    
  return (
        <div className="PublicComponent">
            <div className="PublicComponent-in">
                <div className="Public-Nav">
                    <NavBar />
                </div>
                <div className="PublicComponent-one">
                    <div className="PublicComponent-one-one">
                         
                    </div>
                    <div className="PublicComponent-one-two">
                        <Routes>
                            <Route path='/loggedIn' element={<LoggedIn/>}/>
                            <Route path='/loggedOut' element={<LoggedOut/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PublicApp