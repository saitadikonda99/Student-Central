import React from 'react'
import { Link } from 'react-router-dom';

import './page.css';

const page = () => {
  return (
    <div className='Admin-sidebar'>
        <div className="Admin-sidebar-in">
            <div className="Admin-sidebar-options">
                <div className="Admin-sidebar-option">
                    <div className="Admin-sidebar-option-in">
                        <Link className='Admin-sidebar-option-in-link' to='/admin'>Home</Link>
                    </div>
                </div>
                <div className="Admin-sidebar-option">
                    <div className="Admin-sidebar-option-in">
                        <Link className='Admin-sidebar-option-in-link' to='/admin/profile'>Profile</Link>
                    </div>
                </div>
                <div className="Admin-sidebar-option">
                    <div className="Admin-sidebar-option-in">
                        <Link className='Admin-sidebar-option-in-link' to='/admin/viewregistration'>View Registration</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page