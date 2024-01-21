import React from 'react';

import useAuth from '../../../../hooks/UseAuth';
import './page.css';

const page = () => {
  const { auth } = useAuth();

  return (
    <div className='stundent-home'>
      <div className="student-home-in">
        <div className="student-home-in-one">
          <div className="student-home-in-one-in">
            <h1>Dear, {auth.user}</h1>
            <h1>Welcome to Student Activity Center Student Portal</h1>
            <p>This enterprise is a application aimed to serve as a single platform for deal with the all kinds gtienvances of students. This portal is Designed and Developed by ZeroOne Code Club and maintained by first year students from the club</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page