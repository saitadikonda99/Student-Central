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
            <p>This enterprise is an application designed to function as a unified platform for addressing various grievances of students. The portal has been developed by ZeroOne Code Club and is currently maintained by first-year students associated with the club.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page