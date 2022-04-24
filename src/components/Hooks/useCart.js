import { useEffect, useState } from "react"
import { getCart } from "../utilities/db"

const useCart = () => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const storageCart = getCart()
        let storedCart = []
        const keys = Object.keys(storageCart)
        fetch('http://localhost:5000/productFindByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(keys)
        })
            .then(response => response.json())
            .then(products => {
                for (let id in storedCart) {
                    const findById = products.find(p => p._id === id)
                    if (findById) {
                        const quantity = storedCart[id]
                        findById.quantity = quantity
                        storedCart.push(findById)
                    }
                    setCart(storedCart)
                }
            })
    }, [cart])
    console.log(cart);
    return [cart, setCart]
}
export default useCart