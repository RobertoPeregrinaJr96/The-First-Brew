// package import
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
// internal import
import { fetchUserCartThunk } from '../../../store/carts';
import { fetchPostOneItem } from '../../../store/item'


const CoffeeCart = ({ item, coffeeId, coffee }) => {

    // useState
    const [size, setSize] = useState('Small')
    console.log('size', size)
    const [milk, setMilk] = useState('2% Milk')
    console.log('milk', milk)
    const [temperature, setTemperature] = useState('Warm')
    console.log('temperature', temperature)
    const [shot, setShot] = useState('None')
    console.log('shot', shot)
    const [custom, setCustom] = useState('')
    console.log('custom', custom)
    const [boolean, setBoolean] = useState()
    const [goober, setGoober] = useState()
    const [quantity, setQuantity] = useState(item?.quantity)
    // useDispatch
    const dispatch = useDispatch();
    // useSelector
    const user = useSelector(state => state.session.user)
    const userCartArr = useSelector(state => state.cart.userCart)
    const cart = userCartArr ? userCartArr[0] : []
    // functions
    const handleSubmit = (e) => {

        const instructions = {
            size: size.trim(),
            milk: milk.trim(),
            temperature: temperature.trim(),
            shot: shot.trim(),
            custom: custom.trim()
        }
        // console.log("instructions", instructions)
        dispatch(fetchPostOneItem(coffeeId, cart?.id, instructions))
        dispatch(fetchUserCartThunk(user?.id))
        setBoolean(!boolean)
        setGoober(true)

    }

    const notLoggedIn = () => {
        return <p>Log in you goober</p>
    }

    const loggedIn = (user, item) => {
        console.log('user', user)
        if (!user) return <p>Log in you goober</p>

        else {
            return <div className="cart-div-quantity-wrapper1">
                <form className='instructions-form' onSubmit={(e) => handleSubmit(e, user, item)}>
                    {/* MILK */}
                    <label for="item-Size">Size:</label>
                    <select id="item-Size" onChange={(e) => setSize(e.target.value === '--Please choose an option--' ? 'Small' : e.target.value)}>
                        <option value="--Please choose an option--">--Please choose an option--</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="large">large</option>
                        <option value="Extra Large">Extra Large</option>
                        <option value="Gallon">Gallon</option>
                        <option value="Office (3 Gallons)">Office (3 Gallons)</option>
                    </select>
                    {/* Milk */}
                    <label for="item-Milk">Milk:</label>
                    <select id="item-Milk" onChange={(e) => setMilk(e.target.value === '--Please choose an option--' ? '2% Milk' : e.target.value)}>
                        <option value="--Please choose an option--">--Please choose an option--</option>
                        <option value="None">None</option>
                        <option value="Heavy Cream">Heavy Cream</option>
                        <option value="Vanilla Sweet Cream">Vanilla Sweet Cream</option>
                        <option value="Nonfat Milk">Nonfat Milk</option>
                        <option value="2% Milk">2% Milk</option>
                        <option value="Whole Mlik">Whole Mlik</option>
                        <option value="Breve (Half & Half)">{`Breve (Half & Half)`}</option>
                        <option value="Almond">Almond</option>
                        <option value="Coconut">Coconut</option>
                        <option value="Oatmilk">Oatmilk</option>
                        <option value="Soy">Soy</option>
                    </select>
                    {/* Status */}
                    <label for="item-milk-temperature"> Temperature:</label>
                    <select id="item-milk-temperature" onChange={(e) => setTemperature(e.target.value === '--Please choose an option--' ? 'Hot' : e.target.value)}>
                        <option value="--Please choose an option--">--Please choose an option--</option>
                        <option value='Iced'>Iced</option>
                        <option value="Cold">Cold</option>
                        <option value="Warm">Warm</option>
                        <option value="Hot">Hot</option>
                        <option value="Very Hot">Very Hot</option>
                        <option value="Steamed">Steamed</option>
                    </select>
                    {/* Shots */}
                    <label for="item-milk-shot">Espresso & shot Options:</label>
                    <select id="item-milk-shot" onChange={(e) => setShot(e.target.value === '--Please choose an option--' ? 'None' : e.target.value)}>
                        <option value="--Please choose an option--">--Please choose an option--</option>
                        <option value="None">None</option>
                        <option value="Signature Espresso Roast">Signature Espresso Roast</option>
                        <option value="">Blond Espresso Roast</option>
                        <option value="Blond Espresso Roast">Decaf Espresso Roast</option>
                        <option value="1/3 Decaf Espresso Roast">1/3 Decaf Espresso Roast</option>
                        <option value="1/2 Decaf Espresso Roast">1/2 Decaf Espresso Roast</option>
                        <option value="2/3 Decaf Espresso Roast">2/3 Decaf Espresso Roast</option>
                    </select>
                    {/* Custom  */}
                    <textarea onChange={(e) => setCustom(e.target.value)} placeholder='Custom Instructions'></textarea>
                    {/* <button type='submit'>Add Instructions</button> */}
                    <button type='submit' onClick={(e) => loggedIn(user, item)}>Post</button>
                    {/* {loggedIn(user, item)} */}
                </form>
            </div>
        }
    }



    useEffect(() => {
        dispatch(fetchUserCartThunk(user?.id))
    }, [dispatch, boolean])

    return (
        <div className='cart-div'>
            {user ? loggedIn(user, item) : notLoggedIn()}
        </div>
    )
}

export default CoffeeCart
    // const updateItemMinus = (e, item, id) => {
    //     console.log("item IN QUICK ITEM", item)
    //     // console.log("id IN QUICK ITEM", id)
    //     const quantity = item?.quantity
    //     if (quantity == 0) return null
    //     const updateItem = {
    //         "cartId": item?.cartId,
    //         "coffeeId": item?.coffeeId,
    //         "instructionId": item?.instructionId,
    //         "quantity": (item?.quantity - 1)
    //     }
    //     if (quantity == 1) {
    //         setGoober(true)
    //         dispatch(fetchDeleteItemThunk(item.id))
    //         dispatch(fetchUserCartThunk(user?.id))
    //         setTimeout(() => {
    //             setGoober(false)
    //         }, 700)
    //     }
    //     if (quantity >= 2) {
    //         setGoober(true)
    //         dispatch(fetchUpdateItemThunk(updateItem, id))
    //         dispatch(fetchUserCartThunk(user?.id))
    //         setQuantity(quantity - 1)
    //         setTimeout(() => {
    //             setGoober(false)
    //         }, 300)
    //     }
    //     setBoolean(!boolean)
    // }

    // const updateItemPlus = (e, item, id) => {
    //     const updateItem = {
    //         "cartId": item?.cartId,
    //         "coffeeId": item?.coffeeId,
    //         "instructionId": item?.instructionId,
    //         "quantity": (item?.quantity + 1)
    //     }
    //     dispatch(fetchUpdateItemThunk(updateItem, id))
    //     dispatch(fetchUserCartThunk(user?.id))
    //     setQuantity(quantity + 1)
    //     setGoober(true)
    //     setTimeout(() => {
    //         setGoober(false)
    //     }, 400)
    //     setBoolean(!boolean)
    // }
