import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
    
    const { auth, setAuth } = useAuth()
    const host = import.meta.env.VITE_HOST
    const from = location?.state?.from || "/";
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        branch: '',
        year: '',
        address: '',
        phone: '',
        profile_pic: '',
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

            const response = await axios.post(`${host}/registration`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            alert(response.data.message)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(auth){
            navigate(from, { replace: true })
            alert('You are already logged in')
        }
    },[])


  return (
        <div className="RegistrationComponent">
            <div className="RegistrationComponent-in">
                <div className="Reg-one">
                    <h1>Registration?</h1>
                </div>
                <div className="Reg-two">
                    <div className="Reg-two-in">
                     
                    <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleInputChange}
                        value={formData.username}
                     />
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleInputChange}
                        value={formData.password}
                    />  
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleInputChange}
                        value={formData.name}
                    />
                    <input 
                        type="text"
                        name="branch"
                        placeholder="Branch"
                        onChange={handleInputChange}
                        value={formData.branch}
                    />
                    <input 
                        type="text"
                        name="year"
                        placeholder="Year"
                        onChange={handleInputChange}
                        value={formData.year}
                    />
                    <input 
                        type="text"
                        name="address"
                        placeholder="Address"
                        onChange={handleInputChange}
                        value={formData.address}
                    />
                    <input 
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleInputChange}
                        value={formData.phone}
                    />
                    <input 
                        type="text"
                        name="profile_pic"
                        placeholder="Profile Pic"
                        onChange={handleInputChange}
                        value={formData.profile_pic}
                    />
                    <button onClick={handleSubmit}>Register</button>

                    </div>
                </div>
            </div>
        </div>
  )
}

export default Registration