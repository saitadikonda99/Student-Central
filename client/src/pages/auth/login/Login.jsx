import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Loader from '../../../components/Loader/page'
import './Login.css';

import login from '../../../assets/login.png';

function Login() {
    const { auth, setAuth } = useAuth()
    console.log('auth:', auth)
    const host = import.meta.env.VITE_HOST
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from || "/";

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

   // Handle input changes
   const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            setLoading(true);
            const response = await axios.post(`${host}/login`,
              JSON.stringify(formData),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );

            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const role = response?.data?.role;
            const user = response?.data?.username;
            const id = response?.data?.id;
            
            // set the auth state
            setAuth({
                id,
                accessToken,
                refreshToken,
                role,
                user,
            });

        } catch (error) { 
            toast.error('error.message')
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (auth) {
            setTimeout(() => {
                if (auth?.role?.includes('Student')) {
                    navigate('/student', { replace: true });
                } else if (auth?.role?.includes('Admin')) {
                    navigate('/admin', { replace: true });
                }
            }, 0);
        }
    }, [auth, navigate]);

    
    useEffect(() => {

        if(auth?.accessToken) {
            navigate(from, { replace: true });
        }
    }
    , []);

  return (

    <div className="login">
        { loading ? <Loader /> : null}
        <div className="login-in">
            <div className="login-card">
                <div className="login-card-in">
                    <div className="login-card-in-one">
                        <div className="login-card-in-one-header">
                            <h1>Login to get Started</h1>
                            <p>Use your University ID as Username</p>
                        </div>
                        <div className="login-card-in-one-one">
                            <form className='login-card-in-one-one-in' onSubmit={handleSubmit}>
                                <div className="login-card-in-one-one-one">
                                    <input 
                                        type='text'
                                        name='username'
                                        placeholder='Username'
                                        value={formData.username}
                                        onChange={handleInputChange}                        
                                    />
                                </div>
                                <div className="login-card-in-one-one-two">
                                    <input 
                                        type='password'
                                        name='password'
                                        placeholder='Password'
                                        value={formData.password}
                                        onChange={handleInputChange}                        
                                    />
                                </div>
                                <div className="login-card-in-one-one-three">
                                    <button type='submit'>Login</button>
                                    <Link className='login-card-in-one-one-three-link' to='/auth/register' >Not registered?</Link>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="login-card-in-two">
                        <div className="login-card-in-two-in">
                            <img src={login} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
