import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserCartThunk } from "../../store/carts"
import { fetchDeleteItemThunk, fetchUpdateItemThunk } from "../../store/item"





const ShoppingCart = () => {

    // general Variables
    const [boolean, setBoolean] = useState(true)
    const dispatch = useDispatch()
    const cartsObj = useSelector(state => state.cart.userCart[0])
    // specific Variables
    const items = cartsObj?.Items

    // Onclick functions
    const updateItemMinus = (e, item, id) => {
        const quantity = item.quantity
        const updateItem = {
            "cartId": item.cartId,
            "coffeeId": item.coffeeId,
            "instructionId": item.instructionId,
            "quantity": (item.quantity - 1)
        }
        if (quantity <= 1) dispatch(fetchDeleteItemThunk(item.id))
        dispatch(fetchUpdateItemThunk(updateItem, id))
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
        setBoolean(!boolean)
    }
    const deleteItem = (e, id) => {
        dispatch(fetchDeleteItemThunk(id))
        setBoolean(!boolean)
    }

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
        <div>
            <h1>Shopping Cart</h1>
            <ul>
                {items?.map(item => {
                    const coffee = item?.Coffee
                    console.log("item", item)
                    console.log("coffee", coffee)
                    return <li>
                        <p>Name: {coffee?.name}</p>
                        <p>Price: ${coffee?.price}</p>
                        <div>
                            quantity:
                            {item.quantity}
                        </div>
                        <button onClick={(e) => updateItemMinus(e, item, item.id)}>Update quantity by -1</button>
                        <button onClick={(e) => updateItemPlus(e, item, item.id)}>Update quantity by 1</button>
                        <button onClick={(e) => deleteItem(e, item.id)}>Delete</button>
                    </li>
                })}
            </ul>
            <p>Total Items: {items?.length}</p>
        </div>
    )
}

export default ShoppingCart
