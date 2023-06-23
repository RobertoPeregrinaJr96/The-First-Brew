import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

import { fetchUserCartThunk } from '../../../store/carts';
import { fetchDeleteItemThunk, fetchOneItemThunk, fetchUpdateItemThunk, fetchPostOneItem } from '../../../store/item'



const CoffeeCart = ({ item, coffeeId, coffee }) => {
    // console.log("item:", item)
    // console.log("coffeeId:", coffeeId)

    const [boolean, setBoolean] = useState()
    const [goober, setGoober] = useState()
    const [quantity, setQuantity] = useState(item?.quantity)

    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCartArr:", userCartArr)
    const cart = userCartArr ? userCartArr[0] : []
    // console.log("cart:", cart)

    const updateItemMinus = (e, item, id) => {
        console.log("item IN QUICK ITEM", item)
        // console.log("id IN QUICK ITEM", id)
        const quantity = item?.quantity
        if (quantity == 0) return null
        const updateItem = {
            "cartId": item?.cartId,
            "coffeeId": item?.coffeeId,
            "instructionId": item?.instructionId,
            "quantity": (item?.quantity - 1)
        }
        if (quantity == 1) {
            setGoober(true)
            dispatch(fetchDeleteItemThunk(item.id))
            dispatch(fetchUserCartThunk(user?.id))
            setTimeout(() => {
                setGoober(false)
            }, 700)
        }
        if (quantity >= 2) {
            setGoober(true)
            dispatch(fetchUpdateItemThunk(updateItem, id))
            dispatch(fetchUserCartThunk(user?.id))
            setQuantity(quantity - 1)
            setTimeout(() => {
                setGoober(false)
            }, 300)
        }
        setBoolean(!boolean)
    }

    const updateItemPlus = (e, item, id) => {
        const updateItem = {
            "cartId": item?.cartId,
            "coffeeId": item?.coffeeId,
            "instructionId": item?.instructionId,
            "quantity": (item?.quantity + 1)
        }
        dispatch(fetchUpdateItemThunk(updateItem, id))
        dispatch(fetchUserCartThunk(user?.id))
        setQuantity(quantity + 1)
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 400)
        setBoolean(!boolean)
    }

    const testPost = async (e) => {
        dispatch(fetchPostOneItem(coffee?.id, cart?.id));
        dispatch(fetchUserCartThunk(user?.id))
        setBoolean(!boolean)
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 400)
    }


    const loggedIn = (user, item) => {

        if (!user) return <p>Log in you goober</p>
        if (user && item) {
            return <div className="cart-div-quantity-wrapper2">
                <button disabled={goober} className="cart-div-quantity-update-minus" onClick={(e) => updateItemMinus(e, item, item?.id)}>-1</button>
                <p className="cart-div-quantity-total" >{quantity ? quantity : item?.quantity}</p>
                <button disabled={goober} className="cart-div-quantity-update-plus" onClick={(e) => updateItemPlus(e, item, item?.id)}>+1</button>
                <p>Total quantity In Cart:{item.quantity}</p>
                <p>Total price of item quantity:${(item.quantity * coffee.price)?.toFixed(2)}</p>
            </div>
        }
        if (user && !item) {
            return <div className="cart-div-quantity-wrapper1">
                <button className="cart-div-quantity-post" disabled={goober} onClick={(e) => testPost(e)}> Add to Cart</button>
            </div>
        }
    }



    useEffect(() => {
        dispatch(fetchUserCartThunk(user?.id))
    }, [dispatch, boolean])

    return (
        <div className='cart-div'>
            {loggedIn(user, item)}
            {/* <button disabled={goober} onClick={(e) => item ? testUpdate(item) : testPost(e)}>Add to cart</button> */}
        </div>
    )
}

export default CoffeeCart
