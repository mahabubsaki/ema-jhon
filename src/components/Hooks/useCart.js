import { useEffect, useState } from "react"
import { getCart } from "../utilities/db"

const useCart = (products) => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const cart = getCart()
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
    }, [products])
    return [cart, setCart]
}
export default useCart