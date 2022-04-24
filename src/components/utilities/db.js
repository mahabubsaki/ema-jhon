const addToBd = (id) => {
    let cartObj;
    const cart = localStorage.getItem('cart')
    if (cart) {
        cartObj = JSON.parse(cart)
    }
    else {
        cartObj = {}
    }

    if (cartObj[id]) {
        cartObj[id] += 1
    }
    else {
        cartObj[id] = 1
    }
    localStorage.setItem('cart', JSON.stringify(cartObj))
}
const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }
    else {
        cart = {}
    }
    return cart
}
const deleteSingleItem = (id) => {
    let cartObj = JSON.parse(localStorage.getItem('cart'))
    delete cartObj[id]
    localStorage.setItem('cart', JSON.stringify(cartObj))
}
export {
    addToBd,
    getCart,
    deleteSingleItem,
}