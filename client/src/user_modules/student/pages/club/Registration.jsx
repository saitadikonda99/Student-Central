import React, { useEffect, useState } from 'react';
import Axios from '../../../../hooks/UseAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/UseAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

 
const [activeButton, setActiveButton] = useState('TEC');


  

  const handleDomainClick = (domain) => {
    setSelectedDomain(domain);
    setActiveButton(domain); // set the active button
  };

  const [selectedClubId, setSelectedClubId] = useState(null);
  const [selectedRegDomain, setSelectedRegDomain] = useState(null);


const handleSubmit = (clubId, Domain) => {
    window.confirm('Are you sure you want to join this club?');
    handleClickOpen();
    setSelectedClubId(clubId);
    setSelectedRegDomain(Domain);
}

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    why: '',
    resumeLink: '',
    preknowledge: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCancelClick = () => {
    setOpen(false);
  }

  const handleConfirmClick = async () => {
    try {
      const { why, resumeLink, preknowledge } = formData;

      setLoader(true);
    const response = await axios.post(
      `${host}/clubReg`,
      JSON.stringify({ userId, clubId: selectedClubId, domain: selectedRegDomain, why, resumeLink, preknowledge }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

      if (response.data?.message == 'Already Registered to a Club') {
        toast.warn('Already Registered to a Club');
        return;
      }

      if (response.data?.message === 'Registered Successfully') {
        toast.success('Registered Successfully');
        return;
      }

      if (response.data?.message === 'Something went wrong!') {
        toast.warn('Something went wrong!');
        return;
      }
      
      toast.warn(response.data?.message);


    } catch (error) {
      console.log(error);
        toast.error('Something went wrong');
    } finally {
      setLoader(false);
       
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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
                    <p> You can enroll in a club based on the category of your choice. The available categories include TEC (Technology Clubs), LCH (Liberal Arts and Hobby Clubs), ESO (Extension and Outreach Clubs), lIE (Innovation, Incubation, and Entrepreneurship Clubs), and HWB (Health and Well-Being Clubs). Technology Clubs, Liberal Arts and Extension and Innovation </p>
                </div>
            </div>
        </div>
        {/* <div className="ClubComponent-in-Topbar">
            <div className="ClubComponent-in-Topbar-in">
                <div className="ClubComponent-in-Topbar-in-in">
                    <button onClick={() => handleDomainClick(null)}>All</button>
                    <button onClick={() => handleDomainClick('TEC')}>TEC</button>
                    <button onClick={() => handleDomainClick('Apple')}>Apple</button>
                    <button onClick={() => handleDomainClick('A2')}>A2</button>
                    <button onClick={() => handleDomainClick('A3')}>A3</button>
                </div>
            </div>
        </div> */}

        <div className="clubregistration-two">
                    <div className="clubregistration-two-in">
                        <div className="clubregistration-two-in-tab">

                            <button className={activeButton === 'TEC' ? 'active' : ''} onClick={() => handleDomainClick('TEC')} >Technology Clubs</button>
                            <button className={activeButton === 'LCH' ? 'active' : ''} onClick={() => handleDomainClick('LCH')}>Liberal Arts and Cultural Clubs</button>
                            <button className={activeButton === 'ESO' ? 'active' : ''} onClick={() => handleDomainClick('ESO')}>Extension and Outreach Clubs</button>
                            <button className={activeButton === 'IIE' ? 'active' : ''} onClick={() => handleDomainClick('IIE')}>Innovation, Incubation, and Entrepreneurship Clubs</button>
                            <button className={activeButton === 'HWB' ? 'active' : ''} onClick={() => handleDomainClick('HWB')}>Health and Well Being Clubs</button>
                        </div>
                    </div>
                </div>
        <div className="ClubList">
<<<<<<< HEAD
          {Array.isArray(clubData) &&
  	clubData
=======
          {clubData
>>>>>>> 667a4b0 (undefined updated)
            .filter((club) => !selectedDomain || club?.club_domain === selectedDomain)
            .map((club) => (
                <div key={club.id} className="clubregistration-two">
                    <div className="clubregistration-two-in">
                        <div className="clubregistration-two-in-card">
                            <div className="clubregistration-two-in-card-one">
                                <div className="clubregistration-two-in-card-one-in">
                                    <img src={club?.club_logo} alt="image of club" />
                                </div>
                            </div>
                            <div className="clubregistration-two-in-card-two">
                                <div className="clubregistration-two-in-card-two-in">
                                    <div className="clubregistration-two-in-card-two-in-one">
                                        <p>{club?.club_domain}</p>
                                        <h1>{club?.club_name}</h1>
                                        <p>{club?.club_desc}</p>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-two">
                                        <div className="clubregistration-two-in-card-two-in-two-in">
                                            <p>{club?.skillset_one}</p>
                                            <p>{club?.skillset_two}</p>
                                            <p>{club?.skillset_three}</p>
                                            <p>{club?.skillset_four}</p>
                                            <p>{club?.skillset_five}</p>
                                        </div>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-three">
                                        <div className="clubregistration-two-in-card-two-in-three-in">
                                            <p>Email: <span>{club?.email}</span></p>
                                        </div>
                                    </div>
                                    <div className="clubregistration-two-in-card-two-in-four">
                                        <div className="clubregistration-two-in-card-two-in-four-in">
<<<<<<< HEAD
<<<<<<< HEAD
                                        <button onClick={() => handleSubmit(club?.id)}>Submit Application</button>
=======
                                        <button onClick={() => handleSubmit(club.id, club.club_domain)}>Submit Application</button>
>>>>>>> main
=======
                                        <button onClick={() => handleSubmit(club?.id)}>Submit Application</button>
>>>>>>> 667a4b0 (undefined updated)
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
      <React.Fragment>
  <Dialog
    open={open} // Use open prop
    onClose={handleClose} // Use handleClose prop
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {"Club Head will can approve / disapprove your application based on your write up."}
    </DialogTitle>
    <DialogContent>
      <div className="clubregistration-popup">
        <div className="clubregistration-popup-content">
          <h2 className='clubregistration-popup-content-header'>Registration Form</h2>
          <label className='clubregistration-popup-content-label'  htmlFor="why">Why do you want to join? (word limit 30 words)</label> 
          <textarea
            className='clubregistration-popup-content-textarea'
            type="text"
            id="why"
            name="why"
            value={formData.why}
            onChange={handleInputChange}
          />
          <label className='clubregistration-popup-content-label' htmlFor="resumeLink">Resume Link</label>
          <input
            className='clubregistration-popup-content-input'
            type="text"
            id="resumeLink"
            name="resumeLink"
            value={formData.resumeLink}
            onChange={handleInputChange}
          />
          <label className='clubregistration-popup-content-label' htmlFor="preknowledge">Preknowledge</label>
          <textarea
            className='clubregistration-popup-content-textarea'
            type="text"
            id="preknowledge"
            name="preknowledge"
            value={formData.preknowledge}
            onChange={handleInputChange}
          />
          <div className="clubregistration-popup-buttons">
            <button onClick={handleCancelClick}>Cancel</button>
            <button onClick={handleConfirmClick} >Confirm</button>
          </div>
            <ToastContainer/>
        </div>
      </div>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} autoFocus>
        Close
      </Button>
    </DialogActions>
  </Dialog>
</React.Fragment>
    </div>
  );
};

 

export default Registration;
