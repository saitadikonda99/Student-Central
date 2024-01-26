import React from 'react'
import { Link } from 'react-router-dom';

import './page.css';

const page = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-in">
            <div className="sidebar-options">
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student'>Home</Link>
                    </div>
                </div>
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student/profile'>Profile</Link>
                    </div>
                </div>
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student/clubregistration'>Club Registration</Link>
                    </div>
                </div>
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student/viewregistration'>View Registration</Link>
                    </div>
                </div>
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student/viewregistration'>SAC Log Book</Link>
                    </div>
                </div>
                <div className="sidebar-option">
                    <div className="sidebar-option-in">
                        <Link className='sidebar-option-in-link' to='/student/viewregistration'>Greviances</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page