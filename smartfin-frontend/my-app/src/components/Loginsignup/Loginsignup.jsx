import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginsignup.css';
import user_icon from '../Assets/person.png';
import email from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Loginsignup = () => {
    const [action, setAction] = useState("Sign Up");
    const navigate = useNavigate();

    const handleSignUp = () => {
        setAction("Sign Up");
        navigate('/home'); // Navigate to /home when the "Sign Up" button is clicked
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action === "Login" ? null : (
                    <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder='Name' />
                    </div>
                )}
                <div className="input">
                    <img src={email} alt="" />
                    <input type="email" placeholder='Email Id' />
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder='Password' />
                </div>
                {action === "Sign Up" ? null : (
                    <div className="forgot-password">
                        Lost password? <span>Click Here!</span>
                    </div>
                )}
            </div>
            <div className="submit-container">
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={handleSignUp}>Sign Up</div>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
            </div>
        </div>
    );
}

export default Loginsignup;
