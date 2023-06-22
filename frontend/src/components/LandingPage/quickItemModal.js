import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchDeleteItemThunk, fetchOneItemThunk, fetchUpdateItemThunk, } from '../../store/item';
import { fetchUserCartThunk } from '../../store/carts';
import { fetchPostOneItem } from '../../store/item';

const ItemModal = ({ coffee, user }) => {
    // console.log("coffee IN QUICK ITEM", coffee)
    // console.log("user IN QUICK ITEM", user)
    // general Variables
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()
    // Specific Variables
    const cartsObj = useSelector(state => state.cart.userCart[0])
    const items = cartsObj?.Items;
    // console.log("items  IN QUICK ITEM", items)
    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCartArr:", userCartArr)
    const cart = userCartArr ? userCartArr[0] : []
    // console.log("cart:", cart)
    const item = items?.find(item => item?.coffeeId === coffee.id)
    console.log("item IN QUICK ITEM", item)
    // Functions
    const handleSubmit = (e) => {

    }
    // UseState
    const [boolean, setBoolean] = useState()
    const [goober, setGoober] = useState()
    const [quantity, setQuantity] = useState(item?.quantity)

    // console.log("Quantity", quantity)


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
            dispatch(fetchDeleteItemThunk(item.id))
            dispatch(fetchUserCartThunk(user?.id))
            setGoober(true)
            setTimeout(() => {
                setGoober(false)
            }, 700)
        }
        if (quantity >= 2) {
            dispatch(fetchUpdateItemThunk(updateItem, id))
            dispatch(fetchUserCartThunk(user?.id))
            setQuantity(quantity - 1)
            setGoober(true)
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

    const coffeeNav = () => {
        history.push(`/coffee/${coffee.id}`)
        closeModal()
    }

    useEffect(() => {
        if (user) dispatch(fetchUserCartThunk(user.id))

    }, [dispatch, quantity])

    // Feature if the user is logged in

    const loggedIn = (user, item) => {

        if (!user) return <p>Log in you goober</p>
        if (user && item) {
            return <div className="landingPage-cart-div-quantity-wrapper2">
                <button disabled={goober} className="landingPage-cart-div-quantity-update-minus" onClick={(e) => updateItemMinus(e, item, item?.id)}>-1</button>
                <p className="landingPage-cart-div-quantity-total" >{quantity ? quantity : item?.quantity}</p>
                <button disabled={goober} className="landingPage-cart-div-quantity-update-plus" onClick={(e) => updateItemPlus(e, item, item?.id)}>+1</button>
                <p>Total quantity:{item.quantity}</p>
                <p>Total price:${(item.quantity * coffee.price)?.toFixed(2)}</p>
            </div>
        }
        if (user && !item) {
            return <div className="landingPage-cart-div-quantity-wrapper1">
                <button className="landingPage-cart-div-quantity-post" disabled={goober} onClick={(e) => testPost(e)}> Add to Cart</button>
            </div>
        }
    }


    useEffect(() => {
        if (user) {
            dispatch(fetchUserCartThunk())
        }
    }, [dispatch])

    return (
        <div className='landingPage-cart-div-wrapper'>
            <div>
                <h1>{coffee.name}</h1>
                <p>{coffee.description}</p>
            </div>
            <div>

            </div>
            <p className='landingPage-coffee-price'>Coffee Price:$ {coffee.price?.toFixed(2)}</p>
            <div className='landingPage-loggedIn-function'>
                {loggedIn(user, item)}
            </div>


            <p
            className='nav-to-coffee'
            onClick={(e) => coffeeNav()}>For More Info click here</p>
        </div>
    )
}

export default ItemModal
