import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import useProducts from '../Hooks/useProducts';
import OverViewSingleItem from '../OverviewSingleItem/OverViewSingleItem';
import { deleteSingleItem, getCart } from '../utilities/db';
import './Overview.css'

const Overview = () => {
    const [products,] = useProducts()
    const [cart, setCart] = useCart(products)
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
        const cart = getCart()
        cart[id] = givenQuantity
        let storedCart = []
        for (let id in cart) {
            const findById = products.find(p => p._id === id)
            if (findById) {
                const quantity = cart[id]
                findById.quantity = quantity
                storedCart.push(findById)
            }
            setCart(storedCart)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return (
        <div>
            <div className="header">
                <div className="overview-container">
                    <div className="overview">
                        {
                            cart.map(pd => <OverViewSingleItem item={pd} key={pd._id} handleSingleDelete={handleSingleDelete}
                                handleQuantity={handleQuantity}
                            ></OverViewSingleItem>)
                        }
                    </div>
                </div>
                <Cart products={cart} deleteCart={deleteCart}>
                    <Link to="/shipment">
                        <button className='chekout-btn'>Proceed to buy</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Overview;