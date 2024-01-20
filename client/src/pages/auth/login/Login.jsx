import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            navigate(from, { replace: true });

        } catch (error) { 
            setError(error?.message);
        }  
    };

    const handleToast = () => {
        error && toast.error('Login Failed', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            });
    }

    useEffect(() => {

        if(auth) {
            navigate(from, { replace: true });
        }
    }
    , []);

  return (

    <div className="LoginComponent" >
        <div className="LoginComponent-in">
            <div className="LoginComponent-logo">
                <h2>SAC</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="LoginComponent-one">
                    <input 
                        type='text'
                        name='username'
                        placeholder='Username'
                        value={formData.username}
                        onChange={handleInputChange}                        
                    />
                </div>
                <div className="LoginComponent-two">
                    <input 
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleInputChange}                        
                    />
                </div>
                <div className="LoginComponent-three">
                    <button className='Login-button' type='submit' onClick={handleToast}>Login</button>
                    <ToastContainer />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login