import React from 'react';

const PageButton = ({ children, handleButton, currentPage }) => {
    return (
        <button onClick={() => handleButton(children)} className={`${children === currentPage ? 'selected' : ''}`}>{children}</button>
    );
};

export default PageButton;