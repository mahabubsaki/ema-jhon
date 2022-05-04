import { useEffect, useState } from "react"
import { getCart } from "../utilities/db"

const useCart = () => {
    const [cart, setCart] = useState([])
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
                }
                setCart(storedCart)
            })
    }, [])
    return [cart, setCart]
}
export default useCart