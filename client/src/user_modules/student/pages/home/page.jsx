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
            <h1>Welcome, {auth.user}</h1>
            <h1>Welcome to Student Activity Center Student Portal</h1>
            <p>This enterprise is an application designed to function as a unified platform for addressing various grievances of students. The portal has been developed by ZeroOne Code Club and is currently maintained by first-year students associated with the club.</p>
          </div>
        </div>
        <div className="student-home-in-two">
          <div className="student-home-in-two-in">
            <div className="student-home-in-two-in-header">
              <h1>Announcements</h1>
            </div>
            <div className="student-home-in-two-in-one">
              <p>Dose Committee Announcement</p>
              <p>SAC Website Launched</p>
              <p>Latest SIL Week 04 Updated</p>
              <p>Compitions are now live </p>
              <p>Message from the director</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default page