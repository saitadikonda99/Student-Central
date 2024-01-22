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
    const host = import.meta.env.VITE_HOST;
    const from = location?.state?.from || "/";
    const axios = Axios();
    const navigate = useNavigate();
    const userId = auth?.id;


    const [clubData, setClubData] = useState([]);
    const [loader, setLoader] = useState(false);

    const [open, setOpen] = React.useState(false);

    


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

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const handleClubRegCheck = (clubId, formData) => {
        window.confirm("Are you sure you want to join this club?") && handleClubReg(clubId, formData);
    };

    const handleClubReg = async (clubId, formData) => {
        try {

            setLoader(true);
    
            // Update the request format to match your server's expectations
            console.log('Form Data:', formData);
            const response = await axios.post(
                `${host}/clubReg`,
                {
                    userId,
                    clubId,
                    why: formData?.why || '',
                    resume_link: formData?.resumeLink || '',
                    preknowledge: formData?.preknowledge || '',
                },
                {
                    withCredentials: true,
                }
            );
            

            if (response.data?.message === 'Already Registered to a Club') {
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

    const [selectedDomain, setSelectedDomain] = useState(null);
    const [activeButton, setActiveButton] = useState('TEC');

    const filteredClubData = selectedDomain
        ? clubData.filter((club) => club.club_domain === selectedDomain)
        : clubData;

    const handleDomainClick = (domain) => {
        setSelectedDomain(domain);
        setActiveButton(domain);
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
                            {/* <button onClick={() => handleDomainClick(null)}>All Categories of Clubs</button> */}
                            <button className={activeButton === 'TEC' ? 'active' : ''} onClick={() => handleDomainClick('TEC')} >Technology Clubs</button>
                            <button className={activeButton === 'LCH' ? 'active' : ''} onClick={() => handleDomainClick('LCH')}>Liberal Arts and Cultural Clubs</button>
                            <button className={activeButton === 'ESO' ? 'active' : ''} onClick={() => handleDomainClick('ESO')}>Extension and Outreach Clubs</button>
                            <button className={activeButton === 'IIE' ? 'active' : ''} onClick={() => handleDomainClick('IIE')}>Innovation, Incubation, and Entrepreneurship Clubs</button>
                            <button className={activeButton === 'HWB' ? 'active' : ''} onClick={() => handleDomainClick('HWB')}>Health and Well Being Clubs</button>
                        </div>
                    </div>
                </div>
                <div className="ClubList">
                {filteredClubData.map((club) => (
                    <ClubCard
                        key={club.id}
                        club={club}
                        handleClubRegCheck={handleClubRegCheck}
                        handleClickOpen={handleClickOpen} 
                        handleClose={handleClose} 
                        open={open} // Pass open as a prop
                    />
                ))}

                <ToastContainer />

                </div>
            </div>
        </div>
    );
};

const ClubCard = ({ club, handleClubRegCheck, handleClickOpen, handleClose, open }) => {

    const handleRegisterAndOpen = () => {
        handleRegisterClick(); // This is defined in the same component, so no need to receive it as a prop
        handleClickOpen();
    };

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [formData, setFormData] = useState({
        why: '',
        resumeLink: '',
        preknowledge: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleRegisterClick = () => {
        setIsFormVisible(true);
    };

    const handleCancelClick = () => {
        setIsFormVisible(false);
        setFormData({
            why: '',
            resumeLink: '',
            preknowledge: '',
        });
    };

    const handleConfirmClick = () => {
        console.log('Form Data:', formData);
        if (formData.why && formData.resumeLink && formData.preknowledge) {
            handleClubRegCheck(club.id, formData);
            setIsFormVisible(false);
            setFormData({
                why: '',
                resumeLink: '',
                preknowledge: '',
            });1
        } else {
            toast.error('Please fill out all fields.');
        }
        handleClose();
    };

    return (
        <div className="clubregistration-two">
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
                                <button onClick={handleRegisterAndOpen}>Submit Application</button>
                                </div>
                            </div>
                        </div>
                    </div>
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
          <DialogContentText id="alert-dialog-description">
                <div className="clubregistration-popup">
                    <div className="clubregistration-popup-content">
                        <h2 className='clubregistration-popup-content-header'>Registration Form</h2>
                        <label className='clubregistration-popup-content-label'  htmlFor="why">Why do you want to join? (word limit 30 words)</label> 
                        {/* <input

                            type="text"
                            id="why"
                            name="why"
                            value={formData.why}
                            onChange={handleInputChange}
                        />
                        change this to a text area */}
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
                        {/* <input
                            type="text"
                            id="preknowledge"
                            name="preknowledge"
                            value={formData.preknowledge}
                            onChange={handleInputChange}
                        /> */}
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
                    </div>
                </div>
          </DialogContentText>
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
