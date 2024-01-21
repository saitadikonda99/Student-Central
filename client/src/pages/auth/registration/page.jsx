import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './page.css';
import login from '../../../assets/login.png';

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
        profile_pic: 'NA',
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
       <div className="register">
        <div className="register-in">
            <div className="register-card">
                <div className="register-card-in">
                    <div className="register-card-in-one">
                        <div className="register-card-in-one-header">
                            <h1>Signup for the portal</h1>
                        </div>
                        <div className="register-card-in-one-one">
                            <div className="register-card-in-one-one-one">
                                <input 
                                    className='register-card-in-one-one-one-input'
                                    type="text"
                                    name="username"
                                    placeholder="Username - University ID"
                                    onChange={handleInputChange}
                                    value={formData.username}
                                    required
                                />
                            </div>
                            <div className="register-card-in-one-one-two">
                                <input 
                                    className='register-card-in-one-one-two-input'
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleInputChange}
                                    value={formData.password}
                                    required
                                />
                            </div>
                        </div>

                        <div className="register-card-in-one-two">
                            <div className="register-card-in-one-two-one">
                                <input 
                                    className='register-card-in-one-two-one-input'
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleInputChange}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="register-card-in-one-two-two">
                                <select 
                                    className='register-card-in-one-two-two-input'
                                    name="branch"
                                    onChange={handleInputChange}
                                    value={formData.branch}
                                    required
                                >
                                    <option value="">Select Branch</option>
                                    <option value="CSE">CSE</option>
                                    <option value="ECE">ECE</option>
                                    <option value="ME">ME</option>
                                    <option value="CE">CE</option>
                                    <option value="EE">EE</option>
                                    <option value="CHE">CHE</option>
                                    <option value="MME">MME</option>
                                    <option value="PIE">PIE</option>
                                    <option value="EPH">EPH</option>
                                    <option value="MATH">MATH</option>
                                    <option value="PHY">PHY</option>
                                    <option value="CHEM">CHEM</option>
                                    <option value="HSS">HSS</option>
                                </select>
                            </div>
                        </div>

                        <div className="register-card-in-one-three">
                            <div className="register-card-in-one-three-one">
                                <select 
                                    className='register-card-in-one-three-one-input'
                                    name="year"
                                    onChange={handleInputChange}
                                    value={formData.year}
                                    required
                                >
                                    <option value="">Select Year</option>
                                    <option value="1">1st</option>
                                </select>
                            </div>
                            <div className="register-card-in-one-three-two">
                                <select 
                                    className='register-card-in-one-three-two-input'
                                    name="address"
                                    onChange={handleInputChange}
                                    value={formData.address}
                                    required
                                >
                                    <option value="">Select Your State / Union Territory</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option> 
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttarakhand">Uttarakhand</option> 
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="West Bengal">West Bengal</option>
                                    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                    <option value="Chandigarh">Chandigarh</option>
                                    <option value="Dadra and Nagar Haveli and Daman & Diu">Dadra and Nagar Haveli and Daman & Diu</option>
                                    <option value="The Government of NCT of Delhi">The Government of NCT of Delhi</option>
                                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                                    <option value="Ladakh">Ladakh</option>
                                    <option value="Lakshadweep">Lakshadweep</option>
                                    <option value="Puducherry">Puducherry</option>

                                </select>

                            </div>
                        </div>

                        <div className="register-card-in-one-four">
                            <div className="register-card-in-one-four-one">
                                <input 
                                    className='register-card-in-one-four-one-input'
                                    type="text"
                                    name="phone"
                                    placeholder="Phone Number"
                                    onChange={handleInputChange}
                                    value={formData.phone}
                                    required
                                />
                            </div>
                            <div className="register-card-in-one-four-two">
                                {/* <input 
                                    className='register-card-in-one-four-two-input'
                                    type="text"
                                    name="profile_pic"
                                    placeholder="Profile Picture"
                                    onChange={handleInputChange}
                                    value={formData.profile_pic}
                                /> */}
                            </div>
                        </div>

                        <div className="register-card-in-one-five">
                            <button className='register-card-in-one-five-button' onClick={handleSubmit}>Register</button>
                            <Link className='register-card-in-one-five-link' to='/auth/login' >Login instead</Link>
                        </div>



                    </div>
                    <div className="register-card-in-two">
                        <div className="register-card-in-two-in">
                            <img src={login} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
  )
}

export default Registration