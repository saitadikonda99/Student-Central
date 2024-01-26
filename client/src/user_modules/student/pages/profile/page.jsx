import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../../hooks/UseAxiosPrivate';
import useAuth from '../../../../hooks/UseAuth';
import Loader from '../../../../components/Loader/page';

import './page.css';

const Profile = () => {
    const axios = axiosPrivate();
    const { auth } = useAuth();
    const userId = auth?.id;
    const host = import.meta.env.VITE_HOST;

    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    // State variables for updated values
    const [updatedValues, setUpdatedValues] = useState({
        name: '',
        gender: '',
        branch: '',
        year: '',
        email: '',
        address: '',
        residence: '',
        phone: '',
        profile_pic: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${host}/viewProfile/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, host, axios]);

    // Function to handle the editing mode
    const handleEdit = () => {
        // If entering editing mode, set the initial values
        if (!editing) {
            setUpdatedValues({
                name: profileData[0]?.name,
                gender: profileData[0]?.gender,
                branch: profileData[0]?.branch,
                year: profileData[0]?.year,
                email: profileData[0]?.email,
                address: profileData[0]?.address,
                residence: profileData[0]?.residence,
                phone: profileData[0]?.phone,
                profile_pic: profileData[0]?.profile_pic,
            });
        }
        setEditing(!editing);
    };

    // Function to handle input changes in editing mode
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the update API with updatedValues
        try {
            setLoading(true);
            await axios.put(`${host}/updateProfile/${userId}`, updatedValues);
            // Update local profileData with the updatedValues
            setProfileData([{ ...profileData[0], ...updatedValues }]);
            setEditing(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            {loading && <Loader />}
            <div className="profile-page-in">
                <div className="profile-page-in-header">
                    <h1>Student Profile</h1>
                </div>
                <div className="profile-page-in-one">
                    <div className="profile-page-in-one-in">
                        <form onSubmit={handleSubmit}>
                        {profileData.map((profile) => (
                            <div className="profile-page-in-one-in-one">
                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Name</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="name" value={updatedValues.name} onChange={handleInputChange} /> : <span>{profile.name}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Gender</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="gender" value={updatedValues.gender} onChange={handleInputChange} /> : <span>{profile.gender}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Branch</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="branch" value={updatedValues.branch} onChange={handleInputChange} /> : <span>{profile.branch}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Year</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="year" value={updatedValues.year} onChange={handleInputChange} /> : <span>{profile.year}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Email</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="email" value={updatedValues.email} onChange={handleInputChange} /> : <span>{profile.email}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Address</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="address" value={updatedValues.address} onChange={handleInputChange} /> : <span>{profile.address}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Residence</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="residence" value={updatedValues.residence} onChange={handleInputChange} /> : <span>{profile.residence}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Phone</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="phone" value={updatedValues.phone} onChange={handleInputChange} /> : <span>{profile.phone}</span>}</p>
                                    </div>
                                </div>

                                <div className="profile-page-in-one-in-cmn">
                                    <div className="profile-page-in-one-in-cmn-one">
                                        <p>Profile Pic</p>
                                    </div>
                                    <div className="profile-page-in-one-in-cmn-two">
                                    <p>{editing ? <input type="text" name="profile_pic" value={updatedValues.profile_pic} onChange={handleInputChange} /> : <span>{profile.profile_pic}</span>}</p>
                                    </div>
                                </div>


                            </div>
                        ))}
                            {editing && <button className='save-button' type="submit">Save</button>}
                            
                        </form>
                    </div>
                </div>
                            <div className="profile-page-in-two">
                                <button onClick={handleEdit}>{editing ? 'Cancel' : 'Update'}</button>
                            </div>

                        
            </div>
        </div>
    );
};

export default Profile;
