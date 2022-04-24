import React from 'react';
import './Cart.css'

const Cart = ({ products, deleteCart, children }) => {
    let quantity = 0;
    let eachPrice = 0;
    let shipping = 0;
    let price;
    for (let product of products) {
        price = product.price * product.quantity
        eachPrice = eachPrice + price
        quantity = quantity + product.quantity
        shipping = shipping + product.shipping
    }
    const tax = Number((eachPrice * .1).toFixed(2))
    const grandTotal = Number((eachPrice + shipping + tax).toFixed(2));
    return (
        <div className='cart-container'>
            <div className='info-wrapper'>
                <h1>Cart Information</h1>
                <h3>Total Items: {quantity}</h3>
                <h3>Total Price: {eachPrice}</h3>
                <h3>Shipping Cost: {shipping}</h3>
                <h3>Tax: {tax}</h3>
                <h2>Grand Total: {grandTotal}</h2>
                <button onClick={deleteCart}>Clear Cart</button>
                <br />
                {children}
            </div>
        </div>
    );
};

export default Cart;