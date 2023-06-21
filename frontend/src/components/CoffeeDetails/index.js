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
    let coffeeId = coffeeIdObj.coffeeId
    // console.log("coffeeId :", coffeeId)


    let userId;
    let userCart;
    let items;
    let itemInCart;

    // specific Variables
    if (user) {

        userId = user.id
        // console.log("userId :", userId)
        userCart = userCartArr[0]
        // console.log("userCart :", userCart)
        items = userCart?.Items
        // console.log("items :", items)
        // Onclick functions
        itemInCart = items ? items.find(item => Number(coffeeId) === Number(item?.coffeeId)) : []
        // console.log("------------------------------------- :")
    }

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
    if (!user) {
        return (<div>
            <h2>HELLO FROM COFFEE {coffeeObj.name} DETAILS</h2>
            <h1>{coffeeObj.name},  price:${coffeeObj?.price?.toFixed(2)}</h1>
            <p>{coffeeObj.description}</p>
        </div>)
    } else {

        return (
            <div className='detail-wrapper'>
                <h2 className='detail-h2'>Custom Features coming soon</h2>
                <div className='detail-img'>
                    <p className={`${(coffeeObj.name)?.toLowerCase()}`}></p>
                </div>

                <div className='detail-div-header'>
                    <h1 className='detail-h1'>{coffeeObj.name},  price:${coffeeObj?.price?.toFixed(2)}</h1>
                </div>

                <div className='detail-description'>
                    <p className='detail-p'>{coffeeObj.description}</p>
                </div>
                <div className='detail-div-component'>

                    <CoffeeCart itemUpdate={itemInCart} coffeeId={coffeeId} />

                    <CoffeeDetail coffee={coffeeIdObj} user={user} />

                </div>
            </div>
        )
    }
}

export default CoffeeById
