import React, { useEffect, useState } from 'react'
import Axios from '../../../../hooks/UseAxiosPrivate'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../../components/Loader/page'


const Registration = () => {
    
    const { auth, setAuth } = useAuth()
    console.log('auth:', auth)
    const host = import.meta.env.VITE_HOST
    const from = location?.state?.from || "/";
    const axios = Axios()
    const navigate = useNavigate()

    const userId = auth?.id


    const [clubData, setClubData] = useState([])
    const [loader, setLoader] = useState(false)

    // fetch the club details 
    useEffect(() => {
        const fetchClub = async () => {
            try {
                setLoader(true)
                const response = await axios.get(`${host}/getClubs`);
                
                setClubData(response.data)
            } catch (error) {
                console.log(error)    
            } finally {
                setLoader(false)
            }
        }
        fetchClub()
    }, [])

    const handleClubRegCheck =  (clubId) => {
        window.confirm("Are you sure you want to join this club?") && handleClubReg(clubId)
    }

    const handleClubReg = async (clubId) => {
        try {

            setLoader(true)

            const response = await axios.post(`${host}/clubReg`, JSON.stringify({userId, clubId}), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if(response.data?.message === 'Already Registered to a Club') {
                toast.warn('Already Registered to a Club')
            }

            if(response.data?.message === 'Registered Successfully') {
                toast.success('Registered Successfully')
                navigate('/student/club/viewReg')
            }


        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className="ClubComponent">
            {loader && <Loader />}
            <div className="ClubComponent-in">
                {   
                    clubData.map((club) => {
                        return (
                            <div key={club.id} className="ClubComponent-in-club" >
                                <h1>{club?.club_name}</h1>
                                <h2>{club?.id}</h2>
                                <h3>{club?.club_logo}</h3>
                                <h3>{club?.club_domain}</h3>
                                <button onClick={ () => handleClubRegCheck(club.id)} >Join</button>
                                <ToastContainer />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

};

export default Registration