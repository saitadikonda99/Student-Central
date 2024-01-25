import React from 'react'
import { useState } from 'react'
import Axios from '../../../../hooks/UseAxiosPrivate'

import './page.css'

const page = () => {

    const axios = Axios();
    const host = import.meta.env.VITE_HOST

    const [logData, setLogData] = useState({
        username: '',
        branch: '',
        purpose: '',
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${host}/logInSheet`, logData)
            
            console.log(response)

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setLogData({
            ...logData,
            [name]: value
        })
    }

  return (
        <div className="LogComponent">
            <div className="LogComponent-in">
                <input 
                    type="username"
                    name='username'
                    placeholder='username'
                    value={logData.username}
                    onChange={handleChange}
                />
                <select
                    name="branch"
                    value={logData.branch}
                    onChange={handleChange}
                >
                    <option value="">Select Branch</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">CS&IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                </select>
                <textarea 
                    type="text"
                    name='purpose'
                    placeholder='purpose'
                    value={logData.purpose}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
  )
}

export default page