import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart';
import useCart from '../Hooks/useCart';
import PageButton from '../PageButton/PageButton';
import SingleProduct from '../SingleProduct/SingleProduct';
import { addToBd, getCart } from '../utilities/db';
import './Header.css'

const Header = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useCart()
    const [pageCount, setPageCount] = useState([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        fetch('https://murmuring-journey-28249.herokuapp.com/productsCount')
            .then(response => response.json())
            .then(data => {
                const array = []
                for (let i = 1; i <= Math.ceil(data.count / pageSize); i++) {
                    array.push(i)
                }
                setPageCount(array)
            })
    }, [pageSize])
    useEffect(() => {
        fetch(`https://murmuring-journey-28249.herokuapp.com/products?page=${currentPage - 1}&size=${pageSize}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [currentPage, pageSize])
    const handleButton = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const handlePage = (e) => {
        setCurrentPage(1)
        setPageSize(e.target.value)
    }
    const deleteCart = () => {
        localStorage.removeItem('cart')
        setCart([])
    }
    const handleOnClick = (selectedProduct) => {
        let newArray = []
        const exists = cart.find(p => p._id === selectedProduct._id)
        if (!exists) {
            selectedProduct.quantity = 1
            newArray = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(p => p._id !== selectedProduct._id)
            exists.quantity = exists.quantity + 1
            newArray = [...rest, exists]
        }
        setCart(newArray)
        addToBd(selectedProduct._id)
    }
    useEffect(() => {
        const storageCart = getCart()
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
                    setCart(storedCart)
                }
            })
    }, [setCart])
    return (
        <div>
            <div className="header">
                <div className='products-container'>
                    <div className="all-buttons">
                        {
                            pageCount.map(page => <PageButton key={page} handleButton={handleButton} currentPage={currentPage}>{page}</PageButton>)
                        }
                    </div>
                    <div className="page-size-container">
                        <select onChange={handlePage} defaultValue={"10"}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className='all-products'>
                        {
                            products.map(product => <SingleProduct product={product} key={product._id} handleOnClick={handleOnClick}></SingleProduct>)
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