import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

import { fetchPostOneItem, fetchUpdateItemThunk } from '../../../store/item';
import { fetchUserCartThunk } from '../../../store/carts';



const CoffeeCart = ({ itemUpdate, coffeeId }) => {
    // console.log("itemUpdate:", itemUpdate)
    // console.log("coffeeId:", coffeeId)

    const [boolean, setBoolean] = useState(true)
    const [goober, setGoober] = useState(false)
    const dispatch = useDispatch();

    const user = useSelector(state => state.session.user)

    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCartArr:", userCartArr)
    const cart = userCartArr ? userCartArr[0] : []
    // console.log("cart:", cart)

    const testPost = async (e) => {
        dispatch(fetchPostOneItem(coffeeId, cart?.id));
        setBoolean(!boolean)
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 300)
    }

    const testUpdate = async (itemUpdate) => {
        itemUpdate.quantity += 1;
        dispatch(fetchUpdateItemThunk(itemUpdate, itemUpdate?.id))
        setBoolean(!boolean)
        setTimeout(() => {
            setGoober(false)
        }, 200)
    }

    useEffect(() => {
        dispatch(fetchUserCartThunk(user?.id))
    }, [dispatch, boolean])

    return (
        <div>
            <button disabled={goober} onClick={(e) => itemUpdate ? testUpdate(itemUpdate) : testPost(e)}>Add to cart</button>
        </div>
    )
}

export default CoffeeCart
