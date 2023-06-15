import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCartThunk } from "../../store/carts"




const ShoppingCart = () => {

    const dispatch = useDispatch()
    const cartsObj = useSelector(state => state.cart.userCart[0])
    console.log("cartsObj in index", cartsObj?.Items)
    const items = cartsObj?.Items
    console.log('items', items)

    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch])

    return (
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {items?.map(item => {
                    const coffee = item?.Coffee
                    console.log("item", item)
                    console.log("coffee", coffee)
                    return <li>
                        <p>{coffee?.name}</p>
                        <p>{coffee?.price}</p>
                        <div>
                            quantity:
                            {item.quantity}
                        </div>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default ShoppingCart
