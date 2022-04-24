import React from 'react';
import './SingleProduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const SingleProduct = ({ product, handleOnClick }) => {
    const { name, category, seller, price, shipping, img } = product;
    return (
        <div className='single-product'>
            <div className='info-div'>
                <div className='img-div'>
                    <img src={img} alt="" />
                </div>
                <h1>{name}</h1>
                <h2>Category: {category}</h2>
                <h2>Price: ${price}</h2>
                <h2>Seller : {seller}</h2>
                <h2>Shipping Cost : ${shipping}</h2>
            </div>
            <button onClick={() => handleOnClick(product)}>Add to Cart
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default SingleProduct;