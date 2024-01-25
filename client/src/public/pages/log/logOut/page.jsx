import React, { useEffect } from 'react';
import { useState } from 'react';
import Axios from '../../../../hooks/UseAxiosPrivate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './page.css';

const page = () => {
    const axios = Axios();
    const host = import.meta.env.VITE_HOST;

    const [logData, setLogData] = useState([]);
    const [searchInput, setSearchInput] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${host}/logData`);
                setLogData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [axios]);

    console.log(logData);

    const handleSubmit = async (username) => {
        try {
            const response = await axios.post(
                `${host}/logOutSheet`,
                { username: username },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            toast.success('Logged Out Successfully');

        } catch (error) {
            toast.error('Something went wrong');
        }
    };

     
    return (
        <div className="LogOutComponent">
            <input
                type="text"
                placeholder="Search by username"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="LogOutComponent-in">
                {logData
                    .filter((data) =>
                        data.username.toLowerCase().includes(searchInput.toLowerCase())
                    )
                    .map((data) => {
                        return (
                            <div key={data.id} className="LogOutComponent-in-one">
                                <div className="LogOutComponent-in-one-one">
                                    <h3>{data.username}</h3>
                                    <p>{data.branch}</p>
                                    <p>{data.year}</p>
                                </div>
                                <div className="LogOutComponent-in-one-two">
                                    <button onClick={() => handleSubmit(data.username)}>
                                        Logout
                                    </button>
                                    <ToastContainer />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default page;
