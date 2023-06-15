import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchOneCoffeeThunk } from '../../store/coffee';
import { fetchPostOneItem, fetchUpdateItemThunk } from '../../store/item';
import { fetchUserCartThunk } from "../../store/carts"



const CoffeeById = () => {
    // general Variables
    const [boolean, setBoolean] = useState(true)
    const dispatch = useDispatch();
    const coffeeIdObj = useParams();
    // console.log("coffeeIdObj", coffeeIdObj)
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)
    // console.log("Coffee State:", coffeeObj)
    const user = useSelector(state => state.session.user)
    // console.log("User State:", user)
    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCart State", userCartArr)
    // specific Variables
    const userId = user.id
    const coffeeId = coffeeIdObj.coffeeId
    // console.log("coffeeId in specific Variables", coffeeId)
    const userCart = userCartArr[0]
    // console.log("USER Cart in specific Variables", userCart)
    const items = userCart?.Items
    // console.log("ITEMS in specific Variables", items )
    // Onclick functions
    const itemInCart = items ? items.find(item => Number(coffeeId) === Number(item?.coffeeId)) : []

    function testPost(e) {
        dispatch(fetchPostOneItem(coffeeId, userCart?.id));
        setBoolean(!boolean)
    }

    const testUpdate = (itemInCart) => {
        itemInCart.quantity += 1;
        // console.log("itemInCart", itemInCart)
        // console.log("Dispatch", itemInCart, Number(itemInCart?.coffeeId))
        dispatch(fetchUpdateItemThunk(itemInCart,itemInCart.id ))
        setBoolean(!boolean)
    }

    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchOneCoffeeThunk(coffeeId))
        dispatch(fetchUserCartThunk(userId))
    }, [dispatch, boolean, userId,])


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
            <button onClick={(e) => itemInCart ? testUpdate(itemInCart) : testPost(e)}>Add to cart</button>
        </div>
    )
}

export default CoffeeById
