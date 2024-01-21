import React from 'react'

import useAuth from '../../../../hooks/UseAuth';
import useLogout from '../../../../hooks/UseLogout';

import './page.css';


const page = () => {
    const { auth } = useAuth();
    const logout = useLogout();
    console.log(auth);

  return (
    <div className='topnav'>
        <div className="topnav-in">
            <div className="topnav-in-one">
                <div className="topnav-in-one-in">
                    <h1>Student Activity Center Student Portal</h1>
                </div>
            </div>
            <div className="topnav-in-two">
                <div className="topnav-in-two-in">
                    <p>{auth.user}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page
