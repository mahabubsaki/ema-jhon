import React, { createContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import ContactChild from '../ContactChild/ContactChild';
export const MyContext = createContext('house')

const Contact = () => {
    const [num, setNum] = useState(0)
    const handleOnclick = (number) => {
        setNum(number + num)
    }
    return (
        <MyContext.Provider value={handleOnclick}>
            <div>
                <h1>contact</h1>
                <Link to="via-facebook">
                    <button>Facebook</button>
                </Link>
                <Link to="via-instagram">
                    <button>Instagram</button>
                </Link>
                <div>
                    <Outlet></Outlet>
                </div>
                <h1>{num}</h1>
                <ContactChild></ContactChild>
            </div>
        </MyContext.Provider>
    );
};

export default Contact;