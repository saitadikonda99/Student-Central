import React, { useEffect } from 'react';
import { useState } from 'react';
import useAuth  from '../../../../hooks/UseAuth';
import Axios from '../../../../hooks/UseAxiosPrivate';


import './page.css';

const page = () => {
    const axios = Axios();
    const { auth } = useAuth();
    const host = import.meta.env.VITE_HOST;

    const [logData, setLogData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`${host}/viewLogData/${auth.user}`);

                setLogData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    console.log(logData);   


    return (
        <div className="LogDataComponent">
            <div className="LogDataComponent-in">
                <h1>Log Data</h1>
                {
                    logData && logData.map((log, index) => {
                        return (
                            <div className="LogDataComponent-in-card" key={index}>
                                <div className="LogDataComponent-in-card-id">{log.id}</div>
                                <div className="LogDataComponent-in-card-username">{log.username}</div>
                                <div className="LogDataComponent-in-card-year">{log.year}</div>
                                <div className="LogDataComponent-in-card-branch">{log.branch}</div>
                                <div className="LogDataComponent-in-card-purpose">{log.purpose}</div>
                                <div className="LogDataComponent-in-card-login_time">{log.login_time}</div>
                                <div className="LogDataComponent-in-card-logout_time">{log.logout_time}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default page;
