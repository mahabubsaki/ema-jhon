import React, { useState } from 'react';
import './OverViewSingleItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OverViewSingleItem = ({ item, handleSingleDelete, handleQuantity }) => {
    const { img, name, price, quantity, shipping } = item
    const [myQuantity, setMyQuantity] = useState(quantity)
    const increaseQuantity = (item) => {
        setMyQuantity(myQuantity + 1)
        handleQuantity(myQuantity + 1, item._id)
    }
    const decreaseQuantity = (item) => {
        if (myQuantity > 1) {
            setMyQuantity(myQuantity - 1)
            handleQuantity(myQuantity - 1, item._id)
        }
    }
    return (
        <div className="single-item-container">
            <div className="single-item-img">
                <img src={img} alt="" />
            </div>
            <div className="cart-item-container">
                <div className="details-container">
                    <h2 title={name}>{name.length > 20 ? name.slice(0, 20) + "..." : name}</h2>
                    <h3>Price : ${price}</h3>
                    <h3>Shipping : ${shipping}</h3>
                    <h3>Quantity</h3>
                    <button onClick={() => increaseQuantity(item)}>+</button>{myQuantity} <button onClick={() => decreaseQuantity(item)}>-</button>
                </div>
                <div className="icon-container">
                    <button onClick={() => handleSingleDelete(item)}>
                        <FontAwesomeIcon icon={faTrash} className="icon"></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OverViewSingleItem;