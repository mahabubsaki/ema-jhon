import React from 'react';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import OverViewSingleItem from '../OverviewSingleItem/OverViewSingleItem';
import { deleteSingleItem, getCart } from '../utilities/db';
import './Overview.css'

const Overview = () => {
    const [cart, setCart] = useCart()
    const deleteCart = () => {
        localStorage.removeItem('cart')
        setCart([])
    }
    const handleSingleDelete = (product) => {
        deleteSingleItem(product._id)
        const rest = cart.filter(pd => pd._id !== product._id)
        setCart(rest)
    }
    const handleQuantity = (givenQuantity, id) => {
        const storageCart = getCart()
        storageCart[id] = givenQuantity
        localStorage.setItem('cart', JSON.stringify(storageCart))
        console.log(storageCart);
        let storedCart = []
        const keys = Object.keys(storageCart)
        fetch('https://murmuring-journey-28249.herokuapp.com/productFindByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keys)
        })
            .then(response => response.json())
            .then(products => {
                for (let id in storageCart) {
                    const findById = products.find(p => p._id === id)
                    if (findById) {
                        const quantity = storageCart[id]
                        findById.quantity = quantity
                        storedCart.push(findById)
                    }
                }
                setCart(storedCart)
            })
    }
    const handleProceed = () => {
        localStorage.removeItem('cart')
        setCart([])
        window.alert('Product Ordered Successfuly')
    }
    return (
        <div>
            <div className="header">
                <div className="overview-container">
                    <div className="overview">
                        {cart.length === 0 && <p>No product added</p>}
                        {
                            cart.map(pd => <OverViewSingleItem item={pd} key={pd._id} handleSingleDelete={handleSingleDelete}
                                handleQuantity={handleQuantity}
                            ></OverViewSingleItem>)
                        }
                    </div>
                </div>
                <Cart products={cart} deleteCart={deleteCart}>
                    <button className='chekout-btn' disabled={!cart.length > 0} onClick={handleProceed}>Proceed to buy</button>
                </Cart>
            </div>
        </div>
    );
};

export default Overview;