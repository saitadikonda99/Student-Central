import React from 'react'

import useAuth from '../../../../hooks/UseAuth';
import useLogout from '../../../../hooks/UseLogout';

import './page.css';


const page = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    console.log(auth);

  return (
    <div className='Admin'>
        <div className="Admin-in">
            <div className="Admin-in-one">
                <div className="Admin-in-one-in">
                    <h1>Student Activity Center Admin Dashboard</h1>
                </div>
            </div>
            <div className="Admin-in-two">
                <div className="Admin-in-two-in">
                    <p>{auth.user}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
