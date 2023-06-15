import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css'
import { fetchOneCoffeeThunk } from '../../store/coffee';
import { fetchPostOneItem } from '../../store/item';
import { fetchUserCartThunk } from "../../store/carts"



const CoffeeById = () => {

    const dispatch = useDispatch();
    const coffeeIdObj = useParams();
    const coffeeId = coffeeIdObj.coffeeId
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)
    const user = useSelector(state => state.session.user)
    // console.log(user)
    const userCartArr = useSelector(state => state.cart.userCart)
    const userCart = userCartArr[0]
    // console.log("userCart", userCart)
    const testPost = (e) => {
        // e.preventDefault()
        dispatch(fetchPostOneItem(coffeeId, userCart?.id))
    }

    useEffect(() => {
        dispatch(fetchOneCoffeeThunk(coffeeId))
        dispatch(fetchUserCartThunk(user?.id))
    }, [dispatch])



    return (
        <div>
            <h2>HELLO FROM COFFEE DETAILS</h2>
            <h1>{coffeeObj.name},  price:{coffeeObj.price}</h1>
            <button onClick={(e) => testPost()}>Add to cart</button>
        </div>
    )
}

export default CoffeeById
