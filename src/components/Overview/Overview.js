import React from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import useProducts from '../Hooks/useProducts';
import OverViewSingleItem from '../OverviewSingleItem/OverViewSingleItem';
import { deleteSingleItem, getCart } from '../utilities/db';
import './Overview.css'

const Overview = () => {
    const [products, setProducts] = useProducts()
    const [cart, setCart] = useCart(products)
    const deleteCart = () => {
        localStorage.removeItem('cart')
        setCart([])
    }
    const handleSingleDelete = (product) => {
        deleteSingleItem(product.id)
        const rest = cart.filter(pd => pd.id !== product.id)
        setCart(rest)
    }
    const handleQuantity = (givenQuantity, id) => {
        const cart = getCart()
        cart[id] = givenQuantity
        let storedCart = []
        for (let id in cart) {
            const findById = products.find(p => p.id === id)
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
                            cart.map(pd => <OverViewSingleItem item={pd} key={pd.id} handleSingleDelete={handleSingleDelete}
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