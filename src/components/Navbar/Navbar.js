import React, { useState } from 'react';
import logo from '../../Logo.svg'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNavicon } from '@fortawesome/free-solid-svg-icons';
import CustomLink from '../CustomLink/CustomLink';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const [user] = useAuthState(auth);
    const logOut = () => {
        signOut(auth);
        navigate('/login');
    }
    return (
        <div>
            <nav>
                <div className='logo-btn-div'>
                    <div className='logo-div'>
                        <img src={logo} alt="logo" />
                    </div>
                    <button id="navicon" onClick={() => setShow(!show)}>
                        <FontAwesomeIcon icon={faNavicon}></FontAwesomeIcon>
                    </button>
                </div>
                <div className={`link-div ${show ? 'show' : 'hide'}`}>
                    <CustomLink to="/" className="a">Home</CustomLink>
                    <CustomLink to="/overview" className="a">Overview</CustomLink>
                    <CustomLink to="/about" className="a">About</CustomLink>
                    <CustomLink to="/contact" className="a">Contact</CustomLink>
                    {user?.uid ? '' : <> <CustomLink to="/login" className="a">Login</CustomLink>
                        <CustomLink to="/signup" className="a">Sign Up</CustomLink></>}
                    {user?.uid ? <>
                        <button className="a" onClick={logOut}>Log Out</button>
                    </> : ''}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;