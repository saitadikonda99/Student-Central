import React, { useEffect, useState } from 'react'
import Axios from '../../../../hooks/UseAxiosPrivate'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import useAuth from '../../../../hooks/UseAuth'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../../components/Loader/page'

import './Registration.css';

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

            console.log('clubId:', clubId)
            setLoader(true)

            const response = await axios.post(`${host}/clubReg`, JSON.stringify({userId, clubId}), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if(response.data?.message == 'Already Registered to a Club') {
                toast.warn('Already Registered to a Club')
            }

            if(response.data?.message === 'Registered Successfully') {
                toast.success('Registered Successfully')
                navigate('/student/club/viewReg')
            }

            console.log('response:', response.data.message)  

        } catch (error) {
            console.log(error)
        } finally {
            setLoader(false)
        }
    }

    const [selectedDomain, setSelectedDomain] = useState(null);

    const filteredClubData = selectedDomain
        ? clubData.filter((club) => club.club_domain === selectedDomain)
        : clubData;

    const handleDomainClick = (domain) => {
        setSelectedDomain(domain);
    };

    return (
        <div className="clubregistration-one">
            {loader && <Loader />}
            <div className="clubregistration-one-in">
                <div className="clubregistration-one-in-header">
                    <div className="clubregistration-one-in-header-in">
                        <h1>Club Registration</h1>
                        <p>You can enroll in a club based on the category of your choice. The available categories include TEC (Technology Clubs), LCH (Liberal Arts and Hobby Clubs), ESO (Extension and Outreach Clubs), IIE (Innovation, Incubation, and Entrepreneurship Clubs), and HWB (Health and Well-Being Clubs).</p>
                    </div>
                </div>
                <div className="clubregistration-two">
                    <div className="clubregistration-two-in">
                        <div className="clubregistration-two-in-tab">
                            <button onClick={() => handleDomainClick(null)}>All</button>
                            <button onClick={() => handleDomainClick('TEC')}>Technology Clubs</button>
                            <button onClick={() => handleDomainClick('LCH')}>Liberal Arts and Cultural Clubs</button>
                            <button onClick={() => handleDomainClick('ESO')}>Extension and Outreach Clubs</button>
                            <button onClick={() => handleDomainClick('IIE')}>Innovation, Incubation, and Entrepreneurship Clubs</button>
                            <button onClick={() => handleDomainClick('HWB')}>Health and Well Being Clubs</button>
                        </div>
                    </div>
                </div>
                <div className="ClubList">
                    {filteredClubData.map((club) => (
                        <ClubCard key={club.id} club={club} handleClubRegCheck={handleClubRegCheck} />
                    ))}
                </div>
            </div>
        </div>
    )

};

const ClubCard = ({ club, handleClubRegCheck }) => {
    return (
       <div className="clubregistration-two">
        <div className="clubregistration-two-in">
            <div className="clubregistration-two-in-card">
                <div className="clubregistration-two-in-card-in">
                    <div className="clubregistration-two-in-card-in-img">
                        <img src={club.club_logo} alt="club-logo" />
                    </div>
                    <div className="clubregistration-two-in-card-in-text">
                        <h1>{club.club_name}</h1>
                        <p>{club.club_description}</p>
                    </div>
                    <div className="clubregistration-two-in-card-in-btn">
                        <button onClick={() => handleClubRegCheck(club.id)}>Join</button>
                    </div>
                </div>
            </div>
        </div>
       </div>
    );
};

export default Registration
