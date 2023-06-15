import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCartThunk } from "../../store/carts"




const ShoppingCart = () => {

    const dispatch = useDispatch()
    const cartsObj = useSelector(state => state.cart.allCarts)
    // console.log("cartsObj in index", cartsObj)
    const carts = Object.values(cartsObj)
    // console.log("carts in index", carts)


    useEffect(() => {
        dispatch(fetchAllCartThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {carts.map(cart => {
                    return <li>cartId:{cart.id}, userId:{cart.userId},   quantity:{cart.quantity},  started:{cart.createdAt}</li>
                })}
            </ul>
        </div>
    )
}

export default ShoppingCart
