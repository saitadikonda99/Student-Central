import React from 'react';
import { Link } from 'react-router-dom';
import useAuth  from '../../hooks/UseAuth';
import './page.css';

const page = () => {

  const { auth } = useAuth();

  console.log(auth)

  return (
    <div className='home'>
        <div className="home-in">
            <h1>Home</h1>
            <Link to='/auth/login' >Login</Link>
            <Link to='/auth/register' >Register</Link>
            <Link to='/clubRegister' >Club Register</Link>
            <Link to='/viewReg' >View Reg</Link>
        </div>
    </div>
  )
}

export default page