import React, { createContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Contact = () => {
    return (
        <div>
            <h1>Contact</h1>
            <Link to="via-facebook">
                <button>Facebook</button>
            </Link>
            <Link to="via-instagram">
                <button>Instagram</button>
            </Link>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Contact;