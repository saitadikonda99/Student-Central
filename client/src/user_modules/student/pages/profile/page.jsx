import React from 'react'
import { useEffect, useState } from 'react'
import axiosPrivate from '../../../../hooks/UseAxiosPrivate'
import useAuth from '../../../../hooks/UseAuth'

const Profile = () => {
    const axios = axiosPrivate()
    const { auth } = useAuth()
    const userId = auth?.id
    const host = import.meta.env.VITE_HOST

    const [profileData, setProfileData] = useState([])

    // fetch the club details
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${host}/viewProfile/${userId}`);
                setProfileData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProfile()
    },[])

  return (
        <div className="ProfileComponent">
            <div className="ProfileComponent-in">
                <h1>Profile</h1>
                 { profileData.map((profile) => {
                    return (
                        <div key={profile.id} className="ProfileComponent-in-profile" >
                            <h1>{profile?.username}</h1>
                            <h2>{profile?.name}</h2>
                            <h3>{profile?.branch}</h3>
                            <h3>{profile?.year}</h3>
                            <h3>{profile?.address}</h3>
                            <h3>{profile?.phone}</h3>
                            <h3>{profile?.profile_pic}</h3>
                        </div>
                    )
                 })}
            </div>
        </div>
  )
}

export default Profile