import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { fetchDeleteItemThunk } from "../../store/item"
import { fetchUserCartThunk } from "../../store/carts"
import './index.css'


const CheckoutModel = ({ items }) => {

    const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleSubmit = () => {
        if (items) {
            items.map(item => {
                dispatch(fetchDeleteItemThunk(item.id))
            })
            dispatch(fetchUserCartThunk())

            setBoolean(!boolean)
        }
        closeModal()
        window.alert(" PLACEHOLDER : Your Cart has Successfully been Checkout")
    }


    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch, boolean])

    return (
        <div className='checkout-div-wrapper'>
            <p></p>
            <p className='checkout-p'>Are you ready to Checkout your items?</p>
            <p className='checkout-p'>Please Review your items before preceding</p>
            <div className='checkout-button-div'>
                <button className='checkout-button-cancel' onClick={() => closeModal()}>go back to cart</button>
                <button className='checkout-button-submit' onClick={() => handleSubmit()}>Confirm</button>
            </div>
        </div>
    )
}

export default CheckoutModel
