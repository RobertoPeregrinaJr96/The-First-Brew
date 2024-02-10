import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchAllCoffeeThunk, fetchOneCoffeeThunk } from '../../store/coffee';
import CoffeeDetail from './detailsForCoffee';
import CoffeeCart from './Cart';
import { fetchUserCartThunk } from '../../store/carts';

const CoffeeById = () => {
    // general Variables
    const dispatch = useDispatch();
    const coffeeIdObj = useParams();

    // useState
    const user = useSelector(state => state.session.user)
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)
    const userCartArr = useSelector(state => state.cart.userCart)

    // specific Variables
    let coffeeId = coffeeIdObj.coffeeId
    const a = coffeeObj['CoffeeImages']
    const copy = { ...a }

    // Cart checker
    let userId;
    let userCart;
    let items;
    let itemInCart;

    // Onclick functions
    if (user) {
        userId = user?.id
        userCart = userCartArr[0]
        items = userCart?.Items
        itemInCart = items ? items?.find(item => Number(coffeeId) === Number(item?.coffeeId)) : []

    }

    // I want to pre-populate the state for Coffee and Cart
    useEffect(() => {
        dispatch(fetchAllCoffeeThunk())
        dispatch(fetchOneCoffeeThunk(coffeeId))
        if (user) dispatch(fetchUserCartThunk(user?.id))
    }, [dispatch])

    if (!user) {
        return (<div className='detail-noUser-div-container-top'>
            <div className='detail-noUser-img'>
                <img src={copy[0]?.img}></img>
            </div>
            <p className={`${(coffeeObj.name)?.toLowerCase()} img-p`}></p>
            <div className='detail-noUser-div-header'>

                <h1 className='detail-noUser-h1'>{coffeeObj.name},  price:${coffeeObj?.price?.toFixed(2)}</h1>
            </div>
            <div className='detail-noUser-description'>
                <p className='detail-noUser-p'>{coffeeObj.description}</p>

            </div>
        </div>)
    } else {

        return (
            <div className='detail-main-block-wrapper'>

                <div className='detail-wrapper'>
                    <div className='hail-mary'>
                        <div className='detail-div-container-top'>
                            <div className='detail-img'>
                                <img src={copy[0]?.img}></img>
                            </div>
                            <div className='detail-div-header'>
                                <h1 className='detail-h1'>{coffeeObj.name}  price : ${coffeeObj?.price?.toFixed(2)}</h1>
                            </div>
                            <div className='detail-description'>
                                <p className='detail-p'>{coffeeObj.description}</p>
                                <div>
                                    <CoffeeCart item={itemInCart} coffeeId={coffeeId} coffee={coffeeObj} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='detail-div-component'>
                        <CoffeeDetail coffee={coffeeIdObj} user={user} />
                    </div>
                    {user && !itemInCart}

                </div>
            </div>
        )
    }
}

export default CoffeeById
