import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchOneCoffeeThunk } from '../../store/coffee';
import CoffeeDetail from './detailsForCoffee';
import CoffeeCart from './Cart';
import { fetchAllCoffeeReviewThunk } from '../../store/review';


const CoffeeById = () => {
    // console.log("------------------------------------- :")
    // general Variables
    const dispatch = useDispatch();
    const coffeeIdObj = useParams();
    // console.log("coffeeIdObj :", coffeeIdObj)
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)
    // console.log(" coffeeObj:", coffeeObj)
    const user = useSelector(state => state.session.user)
    // console.log(" user:", user)
    const userCartArr = useSelector(state => state.cart.userCart)
    // console.log("userCartArr :", userCartArr)
    // specific Variables
    const userId = user.id
    // console.log("userId :", userId)
    const coffeeId = coffeeIdObj.coffeeId
    // console.log("coffeeId :", coffeeId)
    const userCart = userCartArr[0]
    // console.log("userCart :", userCart)
    const items = userCart?.Items
    // console.log("items :", items)
    // Onclick functions
    const itemInCart = items ? items.find(item => Number(coffeeId) === Number(item?.coffeeId)) : []
    // console.log("------------------------------------- :")

    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchOneCoffeeThunk(coffeeId))
    }, [dispatch])


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
            <h1>{coffeeObj.name},  price:${coffeeObj?.price?.toFixed(2)}</h1>
            <CoffeeCart itemUpdate={itemInCart} coffeeId={coffeeId} />
            <div>
                <CoffeeDetail coffee={coffeeIdObj} user={user} />
            </div>
        </div>
    )
}

export default CoffeeById
