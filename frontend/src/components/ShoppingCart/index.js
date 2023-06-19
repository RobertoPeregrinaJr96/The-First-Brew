import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCartThunk } from "../../store/carts"
import { fetchDeleteItemThunk, fetchUpdateItemThunk } from "../../store/item"
import Checkout from "./checkout"

import './index.css'



const ShoppingCart = () => {

    // general Variables
    const [boolean, setBoolean] = useState(true)
    const [goober, setGoober] = useState(false)
    const dispatch = useDispatch()
    const cartsObj = useSelector(state => state.cart.userCart[0])
    // specific Variables
    const items = cartsObj?.Items;
    let newTotal;
    let sortedItems;
    if (items) {
        newTotal = items?.map(item => {
            const price = Number(item.Coffee?.price) * Number(item?.quantity)
            return Number(price)
        })
        sortedItems = items.sort((a, b) => { return a.id + b.id })
    }
    // console.log("sorted", sortedItems)
    // Onclick functions

    // Maybe combine this into ONE function and use string interpolation to adjust the positive and negative integers
    const updateItemMinus = (e, item, id) => {
        const quantity = item.quantity
        if (quantity == 0) return null
        const updateItem = {
            "cartId": item.cartId,
            "coffeeId": item.coffeeId,
            "instructionId": item.instructionId,
            "quantity": (item.quantity - 1)
        }
        if (quantity == 1) dispatch(fetchDeleteItemThunk(item.id))
        if (quantity >= 2) dispatch(fetchUpdateItemThunk(updateItem, id))
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 500)
        setBoolean(!boolean)
    }
    const updateItemPlus = (e, item, id) => {
        const updateItem = {
            "cartId": item.cartId,
            "coffeeId": item.coffeeId,
            "instructionId": item.instructionId,
            "quantity": (item.quantity + 1)
        }
        dispatch(fetchUpdateItemThunk(updateItem, id))
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 300)
        setBoolean(!boolean)
    }
    // This is just a plain Overall Delete Item Function
    const deleteItem = (e, id) => {
        dispatch(fetchDeleteItemThunk(id))
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 500)
        setBoolean(!boolean)
    }
    const checkState = () => { }
    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch, boolean])


    /*
    On this Page i want to show the  Client:
        1.) Items that are in the Cart
            - details of the items
        2.) A button to checkout
        3.) The ability to make a new Cart
    */
    return (
        <div className="cart-div-wrapper">
            <h1>Shopping Cart</h1>

            <ul className="cart-div-ul">
                {sortedItems?.map(item => {
                    const coffee = item?.Coffee
                    return <li key={item.id} className="cart-div-li">

                        <p>Name: {coffee?.name}</p>
                        <p>Price: ${coffee?.price}</p>

                        <div>
                            {item.quantity}
                        </div>

                        <div className="cart-div-quantity-wrapper">
                            <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemMinus(e, item, item?.id)}>-1</button>
                            <p className="cart-div-quantity-total" >{item?.quantity ? item.quantity : 0}</p>
                            <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemPlus(e, item, item?.id)}>+1</button>
                        </div>

                        <button className="cart-div-quantity-delete" onClick={(e) => deleteItem(e, item?.id)}
                            disabled={goober} >Delete</button>
                    </li>
                })}
            </ul>

            <div className="cart-footer">
                <p>Total Items: {items?.length}</p>
                <p className="checkout"> {newTotal?.length !== 0 ? `Total Price: $ ${newTotal?.reduce((a, b) => a + b)?.toFixed(2)}` : "Cart is Empty"}</p>
                <Checkout items={items} />
            </div>
        </div>
    )
}

export default ShoppingCart
