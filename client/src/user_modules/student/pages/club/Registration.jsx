import React, { useEffect, useState } from 'react';
import Axios from '../../../../hooks/UseAxiosPrivate';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../../hooks/UseAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../../../components/Loader/page';
import './Registration.css';

const Registration = () => {
  const { auth, setAuth } = useAuth();
  console.log('auth:', auth);
  const host = import.meta.env.VITE_HOST;
  const from = location?.state?.from || '/';
  const axios = Axios();
  const navigate = useNavigate();

  const userId = auth?.id;

  const [clubData, setClubData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  // fetch the club details
  useEffect(() => {
    const fetchClub = async () => {
      try {
        setLoader(true);
        const response = await axios.get(`${host}/getClubs`);

        setClubData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    fetchClub();
  }, []);

  const handleClubRegCheck = (clubId) => {
    window.confirm('Are you sure you want to join this club?') && handleClubReg(clubId);
  };

  const handleClubReg = async (clubId) => {
    try {
      console.log('clubId:', clubId);
      setLoader(true);

      const response = await axios.post(
        `${host}/clubReg`,
        JSON.stringify({ userId, clubId }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data?.message == 'Already Registered to a Club') {
        toast.warn('Already Registered to a Club');
      }

      if (response.data?.message === 'Registered Successfully') {
        toast.success('Registered Successfully');
      }

      console.log('response:', response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
  };

  const handleSubmit = () => {
    navigate('/student/club/registerpage');
  }

  return (
    <div className="ClubComponent">
      {loader && <Loader />}
      <div className="ClubComponent-in">
        <div className="ClubComponent-one">
            <div className="ClubComponent-one-in">
                <div className="Club-head">
                    <h1>Club Registration</h1>    
                </div> 
                <div className="Club-des">
                    <p> You can enroll in a club based on the category of your choice. The available categories include TEC (Technology Clubs), LCH (Liberal Arts and Hobby Clubs), ESO (Extension and Outreach Clubs), lIE (Innovation, Incubation, and Entrepreneurship Clubs), and HWB (Health and Well-Being Clubs).
Technology Clubs, Liberal Arts and Extension and Innovation </p>
                </div>
            </div>
        </div>
        <div className="ClubComponent-in-Topbar">
            <div className="ClubComponent-in-Topbar-in">
                <div className="ClubComponent-in-Topbar-in-in">
                    <button onClick={() => handleDomainClick(null)}>All</button>
                    <button onClick={() => handleDomainClick('TEC')}>TEC</button>
                    <button onClick={() => handleDomainClick('Apple')}>Apple</button>
                    <button onClick={() => handleDomainClick('A2')}>A2</button>
                    <button onClick={() => handleDomainClick('A3')}>A3</button>
                </div>
            </div>
        </div>
        <div className="ClubList">
          {clubData
            .filter((club) => !selectedDomain || club.club_domain === selectedDomain)
            .map((club) => (
                <div key={club.id} className="clubregistration-two">
                    <div className="clubregistration-two-in">
                        <div className="clubregistration-two-in-card">
                            <div className="clubregistration-two-in-card-one">
                                <div className="clubregistration-two-in-card-one-in">
                                    <img src={club.club_logo} alt="image of club" />
                                </div>
                            </div>
                            <div className="clubregistration-two-in-card-two">
                                <div className="clubregistration-two-in-card-two-in">
                                    <div className="clubregistration-two-in-card-two-in-one">
                                        <p>{club.club_domain}</p>
                                        <h1>{club.club_name}</h1>
                                        <p>{club.club_desc}</p>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-two">
                                        <div className="clubregistration-two-in-card-two-in-two-in">
                                            <p>{club.skillset_one}</p>
                                            <p>{club.skillset_two}</p>
                                            <p>{club.skillset_three}</p>
                                            <p>{club.skillset_four}</p>
                                            <p>{club.skillset_five}</p>
                                        </div>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-three">
                                        <div className="clubregistration-two-in-card-two-in-three-in">
                                            <p>Email: <span>{club.email}</span></p>
                                        </div>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-four">
                                        <div className="clubregistration-two-in-card-two-in-four-in">
                                        <button onClick={handleSubmit}>Submit Application</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Registration;