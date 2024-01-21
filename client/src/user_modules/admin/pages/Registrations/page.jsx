import React from 'react'
import Axios from '../../../../hooks/UseAxiosPrivate'
import { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/UseAuth'
import Loader from '../../../../components/Loader/page'

const AdminView = () => {

    const { auth } = useAuth()
    const host = import.meta.env.VITE_HOST
    const axios = Axios()

    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [error, setError] = useState(null);

    // fetch the club details

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${host}/admin`);
                setStudentData(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        fetchStudent()
    },[])


  return (
        <div className="AdminViewComponent">
            <div className="AdminViewComponent-in">
                <h1>Dashboard</h1>
            </div>
        </div>
  )
}

export default AdminView