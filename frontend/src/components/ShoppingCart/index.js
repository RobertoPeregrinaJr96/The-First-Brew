import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCartThunk } from "../../store/carts"
import { fetchDeleteItemThunk, fetchUpdateItemThunk } from "../../store/item"
import Checkout from "./checkout"

import './index.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import OpenModalButton from "../OpenModalButton"
import UpdateInstructions from "./updateInstructions"


const ShoppingCart = () => {

    // general Variables
    const history = useHistory()
    const [boolean, setBoolean] = useState(true)
    const [goober, setGoober] = useState(false)
    const dispatch = useDispatch()
    // useSelector
    const cartsObj = useSelector(state => state.cart.userCart[0])
    // specific Variables
    const items = cartsObj?.Items;
    let newTotal;
    let newTotalQuantity = 0;
    // let sortedItems;
    if (items) {
        newTotal = items?.map(item => {
            const price = Number(item.Coffee?.price) * Number(item?.quantity)
            return Number(price)
        })
        items.forEach(item => {
            newTotalQuantity += item.quantity
        });
    }
    // Onclick functions
    const updateItemMinus = async (e, item, id) => {
        const quantity = item.quantity
        if (quantity == 0) return null
        const updateItem = {
            "cartId": item.cartId,
            "coffeeId": item.coffeeId,
            "instructionId": item.instructionId,
            "quantity": (item.quantity - 1)
        }
        if (quantity == 1) {

            setGoober(true)
            dispatch(fetchDeleteItemThunk(item.id))
            dispatch(fetchUserCartThunk())
            dispatch(fetchUserCartThunk())
            setTimeout(() => {
                setGoober(false)
            }, 600)
            setBoolean(!boolean)
        }
        if (quantity >= 2) {
            dispatch(fetchUpdateItemThunk(updateItem, id))
            dispatch(fetchUserCartThunk())
            setGoober(true)
            setTimeout(() => {
                setGoober(false)
            }, 100)
            setBoolean(!boolean)
        }
    }
    const updateItemPlus = (e, item, id) => {
        const updateItem = {
            "cartId": item.cartId,
            "coffeeId": item.coffeeId,
            "instructionId": item.instructionId,
            "quantity": (item.quantity + 1)
        }
        dispatch(fetchUpdateItemThunk(updateItem, id))
        setBoolean(!boolean)
    }
    // This is just a plain Overall Delete Item Function
    const deleteItem = (e, id) => {
        setGoober(true)
        dispatch(fetchDeleteItemThunk(id))
        setTimeout(() => {
            setGoober(false)
        }, 500)
        setBoolean(!boolean)
    }
    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch, boolean])
    return (
        <div className="cart-div-wrapper">
            <div className="cart-bg-div">
                <div className="cart-style-div">
                    <h1 className="cart-h1">Shopping Cart</h1>

                    <ul className="cart-div-ul">
                        {items?.map(item => {
                            const coffee = item?.Coffee
                            return <li key={item?.id} className="cart-div-li">

                                <p onClick={(e) => history.push(`/coffee/${coffee?.id}`)}>Name: {coffee?.name}</p>
                                <div className="cart-item-instructions-div">
                                    <p>{`${item?.Instruction[0]?.InstructionItem?.map(value => {
                                        return (
                                            value.Addition['name']
                                        )
                                    })}`}</p>
                                    <p>{`${item?.Instruction[0]?.['custom']}`}</p>
                                    <OpenModalButton
                                        buttonText={`Update Instructions`}
                                        modalComponent={<UpdateInstructions item={item} />}
                                    >
                                    </OpenModalButton>

                                </div>

                                <p>Price: ${(coffee?.price).toFixed(2)}</p>

                                <div>
                                    {item?.quantity}
                                </div>

                                <div className="cart-div-quantity-wrapper">
                                    <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemMinus(e, item, item?.id)}>-1</button>
                                    <p className="cart-div-quantity-total" >{item?.quantity ? item?.quantity : 0}</p>
                                    <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemPlus(e, item, item?.id)}>+1</button>
                                </div>

                                <button className="cart-div-quantity-delete" onClick={(e) => deleteItem(e, item?.id)}
                                    disabled={goober} >Delete</button>
                            </li>
                        })}
                    </ul>

                    <div className="cart-footer">
                        <p>Total Items:{newTotalQuantity}</p>
                        <p className="checkout"> {newTotal?.length !== 0 ? `Total Price: $ ${newTotal?.reduce((a, b) => a + b)?.toFixed(2)}` : "Cart is Empty"}</p>
                        <Checkout items={items} />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default ShoppingCart
