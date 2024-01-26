import React, { useEffect, useState } from 'react'
import Axios from '../../../../hooks/UseAxiosPrivate'
import useAuth from '../../../../hooks/UseAuth'
import Loader from '../../../../components/Loader/page'

import './viewReg.css';

const ViewReg = () => {

    const { auth } = useAuth()
    const host = import.meta.env.VITE_HOST
    const axios = Axios()

    const [regData, setRegData] = useState([])

    const [loading, setLoading] = useState(false);

    // fetch the club details
    useEffect(() => {
        const fetchReg = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${host}/viewUserReg/${auth?.id}`);
                setRegData(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchReg()
    },[])

  return (
        

        <div className="viewregistration">
            <div className="viewregistration-in">
                <div className="viewregistration-in-header">
                    <div className="viewregistration-in-header-in">
                        <h1>View Registration</h1>
                    </div>
                </div>
                <div className="viewregistration-in-one">
                    <div className="viewregistration-in-one-in">
                    {
		   Array.isArray(regData) &&
				
                    regData.map((reg) => {
                        return (
                            <div key={reg.club_id} className="ViewComponent-in-reg" >
                                <h1>You are registered to <span>{reg?.club_name} </span>under <span>{reg?.club_domain}</span> category </h1>
                            </div>
                        )
                    })
                }
                    </div>
                </div>
            </div>
        </div>
  )
}

export default ViewReg
