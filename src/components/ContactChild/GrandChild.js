import React, { useContext } from 'react';
import { MyContext } from '../Contact/Contact';

const GrandChild = () => {
    const handleOnclick = useContext(MyContext)
    return (
        <div>
            <button onClick={() => handleOnclick(4)}>add to grandParent</button>
        </div>
    );
};

export default GrandChild;