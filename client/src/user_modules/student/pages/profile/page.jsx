import React, { useEffect, useState } from 'react';
import axiosPrivate from '../../../../hooks/UseAxiosPrivate';
import useAuth from '../../../../hooks/UseAuth';

import './page.css';

const Profile = () => {
    const axios = axiosPrivate();
    const { auth } = useAuth();
    const userId = auth?.id;
    const host = import.meta.env.VITE_HOST;

    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${host}/viewProfile/${userId}`);
                setProfileData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="profile-page">
            <div className="profile-page-in">
                <div className="profile-page-in-header">
                    <h1>Student Profile</h1>
                </div>
                <div className="profile-page-in-one">
                    <div className="profile-page-in-one-in">
                        <table>
                            <tbody>
                                {profileData.map((profile) => (
                                    <tr className='profile-page-in-one-in-one' key={profile.id}>
                                        <td><strong>Username:</strong> <span>{profile.username}</span></td>
                                        <td><strong>Name:</strong> <span>{profile.name}</span></td>
                                        <td><strong>Branch:</strong> <span>{profile.branch}</span></td>
                                        <td><strong>Year:</strong> <span>{profile.year}</span></td>
                                        <td><strong>Address:</strong> <span>{profile.address}</span></td>
                                        <td><strong>Phone:</strong> <span>{profile.phone}</span></td>
                                        <td><strong>Profile Pic:</strong> <span>{profile.profile_pic}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
