import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchOneCoffeeThunk } from '../../store/coffee';
import { fetchPostOneItem, fetchUpdateItemThunk } from '../../store/item';
import { fetchUserCartThunk } from "../../store/carts"



const CoffeeById = () => {
    // general Variables
    const dispatch = useDispatch();
    const coffeeIdObj = useParams();
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)
    const user = useSelector(state => state.session.user)
    const userCartArr = useSelector(state => state.cart.userCart)

    // specific Variables
    const coffeeId = coffeeIdObj.coffeeId
    const userCart = userCartArr[0]
    console.log("USER Cart in React", userCart)
    const items = userCart?.Items
    console.log("ITEMS in React", items)
    // Onclick functions
    const testPost = (e) => {
        // if (coffeeId && userCart?.id) return null

        const isThere = items.find(item => item?.coffeeId === Number(coffeeId))
        console.log("isThere in React", isThere)
        isThere.quantity += 1;
        console.log("isThere.quantity in React", isThere.quantity)
        if (!isThere) dispatch(fetchPostOneItem(coffeeId, userCart.id))
        dispatch(fetchUpdateItemThunk(isThere, isThere.coffeeId))
    }

    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchOneCoffeeThunk(coffeeId))
        dispatch(fetchUserCartThunk(user.id))
    }, [dispatch, coffeeId, user.id])


    /*
    On this Page i want to show the Client:
        1.) Coffee Image
        2.) Coffee Information
        3.) Coffee Reviews <==> Component????
        4.) The ability to add a Coffee to the Users Cart
            - If the User all ready has the coffee in their Cart then an additional Button will appear to edit the amount of Coffees they want to order

    */
    return (
        <div>
            <h2>HELLO FROM COFFEE DETAILS</h2>
            <h1>{coffeeObj.name},  price:${coffeeObj.price}</h1>
            <button onClick={(e) => testPost()}>Add to cart</button>
        </div>
    )
}

export default CoffeeById
