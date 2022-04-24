import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import useProducts from '../Hooks/useProducts';
import PageButton from '../PageButton/PageButton';
import SingleProduct from '../SingleProduct/SingleProduct';
import { addToBd } from '../utilities/db';
import './Header.css'

const Header = () => {
    const [products,] = useProducts()
    const [cart, setCart] = useCart(products)
    const [pageCount, setPageCount] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/productsCount')
            .then(response => response.json())
            .then(data => {
                const array = []
                for (let i = 1; i <= Math.ceil(data.count / 10); i++) {
                    array.push(i)
                }
                setPageCount(array)
            })
    }, [])
    console.log(pageCount)
    const deleteCart = () => {
        localStorage.removeItem('cart')
        setCart([])
    }
    const handleOnClick = (selectedProduct) => {
        let newArray = []
        const exists = cart.find(p => p.id === selectedProduct._id)
        if (!exists) {
            selectedProduct.quantity = 1
            newArray = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(p => p.id !== selectedProduct._id)
            exists.quantity = exists.quantity + 1
            newArray = [...rest, exists]
        }
        setCart(newArray)
        addToBd(selectedProduct._id)
    }
    return (
        <div>
            <div className="header">
                <div className='products-container'>
                    <h1>Products Available: {products.length}</h1>
                    <h1>Pages: {pageCount.length}</h1>
                    <div className='all-products'>
                        {
                            products.map(product => <SingleProduct product={product} key={product._id} handleOnClick={handleOnClick}></SingleProduct>)
                        }
                    </div>
                    <div className="all-buttons">
                        {
                            pageCount.map(page => <PageButton key={page} >{page}</PageButton>)
                        }
                    </div>
                </div>
                <Cart products={cart} deleteCart={deleteCart}>
                    <Link to="/overview">
                        <button className='proceed-to-overview'>Proceed to Overview</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Header;