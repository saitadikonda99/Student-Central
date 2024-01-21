import React, { useEffect, useState } from 'react'
import Axios from '../../hooks/UseAxiosPrivate'
import useAuth from '../../hooks/UseAuth'

const ViewReg = () => {

    const { auth } = useAuth()
    const host = import.meta.env.VITE_HOST
    const axios = Axios()

    const [regData, setRegData] = useState([])

    // fetch the club details
    useEffect(() => {
        const fetchReg = async () => {
            try {
                const response = await axios.get(`${host}/viewUserReg/${auth?.id}`);
                setRegData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchReg()
    },[])

  return (
        <div className="ViewComponent">
            <div className="ViewComponent-in">
                <h1>ViewReg</h1>
                {
                    regData.map((reg) => {
                        return (
                            <div key={reg.club_id} className="ViewComponent-in-reg" >
                                <h1>{reg?.club_name}</h1>
                                <h2>{reg?.id}</h2>
                                <h3>{reg?.club_logo}</h3>
                                <h3>{reg?.club_domain}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}

export default ViewReg