import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { fetchUserCartThunk } from '../../store/carts';
import { fetchPostOneItem } from '../../store/item';

const ItemModal = ({ coffee, user }) => {
    // general Variables
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    // useSelectors
    const cartsObj = useSelector(state => state.cart.userCart[0])
    const userCartArr = useSelector(state => state.cart.userCart)
    // Specific Variables
    const items = cartsObj?.Items;
    const cart = userCartArr ? userCartArr[0] : []
    const item = items?.find(item => item?.coffeeId === coffee.id)
    // UseStates
    const [boolean, setBoolean] = useState()
    const [goober, setGoober] = useState()
    const [quantity, setQuantity] = useState(item?.quantity)
    // Functions
    const testPost = async (e) => {
        const instructions = {
            size: 'Small',
            milk: '2% Milk',
            temperature: 'Warm',
            shot: 'No Espresso shot',
            custom: ''
        }
        dispatch(fetchPostOneItem(coffee?.id, cart?.id, instructions));
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
        if (!user) return <p>Please Login to Order</p>
        if (user) {
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
                onClick={(e) => coffeeNav()}>For More Info click here
            </p>
        </div>
    )
}

export default ItemModal
