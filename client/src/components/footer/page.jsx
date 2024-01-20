import React from 'react';
import './page.css';

import { FaInstagram } from "react-icons/fa6";
import { TfiYoutube } from "react-icons/tfi";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

const page = () => {
  return (
    <div className='footer'>
        <div className="footer-in">
            <div className="footer-one">
                <div className="footer-one-in">
                    <div className="footer-one-in-one">
                        <p>Mission Statement</p>
                        <p>The Student Activity Center at K L Deemed to be University is committed to redefining education beyond traditional boundaries. Our mission is to nurture tomorrow's leaders through real-time learning experiences. We prioritize hands-on problem-solving to impart knowledge, fostering a dynamic and forward-thinking approach to education.</p>
                    </div>
                    <div className="footer-one-in-two">
                        
                    </div>
                </div>
            </div>
            <div className="footer-last">
                <div className="footer-last-in">
                    <div className="footer-last-in-one">
                        <p>Designed and Developed by ZeroOne Code Club | © 2024 KLSAC. All rights reserved.</p>
                    </div>
                    <div className="footer-last-in-two">
                        <div className="footer-last-in-two-in">
                            <div className="footer-last-in-two-in-icons">
                                <div className="footer-last-in-two-in-icon">
                                    <FaInstagram className='footer-last-in-two-in-icon-main' />
                                </div>
                                <div className="footer-last-in-two-in-icon">
                                    <TfiYoutube className='footer-last-in-two-in-icon-main' />
                                </div>
                                <div className="footer-last-in-two-in-icon">
                                    <FaLinkedin className='footer-last-in-two-in-icon-main' />
                                </div>
                                <div className="footer-last-in-two-in-icon">
                                    <IoLogoGithub className='footer-last-in-two-in-icon-main' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page