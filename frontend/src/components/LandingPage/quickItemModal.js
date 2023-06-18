import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchDeleteItemThunk, fetchUpdateItemThunk, } from '../../store/item';
import { fetchUserCartThunk } from '../../store/carts';
import { fetchPostOneItem } from '../../store/item';

const ItemModal = ({ coffee, user }) => {
    console.log("coffee IN QUICK ITEM", coffee)
    console.log("user IN QUICK ITEM", user)
    // general Variables
    const [boolean, setBoolean] = useState()
    const [goober, setGoober] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()
    // Specific Variables
    const cartsObj = useSelector(state => state.cart.userCart[0])
    const items = cartsObj?.Items;
    console.log("itemsitems IN QUICK ITEM", items)
    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCartArr:", userCartArr)
    const cart = userCartArr ? userCartArr[0] : []
    // console.log("cart:", cart)
    const item = items?.find(item => item?.coffeeId === coffee.id)
    console.log("item IN QUICK ITEM", item)
    // Functions
    const handleSubmit = (e) => {

    }

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

    const testPost = async (e) => {
        dispatch(fetchPostOneItem(coffee.id, cart?.id));
        setBoolean(!boolean)
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 300)
    }

    const coffeeNav = () => {
        history.push(`/coffee/${coffee.id}`)
        closeModal()
    }

    useEffect(() => {
        dispatch(fetchUserCartThunk(user.id))
    }, [dispatch])

    // Feature if the user is logged in

    const loggedIn = (user, item) => {

        if (user && item) {
            return <div className="cart-div-quantity-wrapper">
                <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemMinus(e, item, item?.id)}>-1</button>
                <p className="cart-div-quantity-total" >{item?.quantity ? item.quantity : 0}</p>
                <button disabled={goober} className="cart-div-quantity-update" onClick={(e) => updateItemPlus(e, item, item?.id)}>+1</button>
            </div>
        }
        if (user && !item) {
            return <div>
                <button disabled={goober} onClick={(e) => testPost(e)}> Add to Cart</button>
            </div>
        }
        if (!user) return <p>Log in you goober</p>
    }

    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch])

    return (
        <div className='checkout-div-wrapper'>
            <div>
                <h1>{coffee.name}</h1>
                <p>{coffee.description}</p>
            </div>
            <div>

            </div>
            <div>
                {loggedIn(user, item)}
            </div>


            <p onClick={(e) => coffeeNav()}>For More Info</p>
        </div>
    )
}

export default ItemModal
