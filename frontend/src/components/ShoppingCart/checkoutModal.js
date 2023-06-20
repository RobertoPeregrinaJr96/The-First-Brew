import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { fetchDeleteItemThunk } from "../../store/item"
import { fetchUserCartThunk } from "../../store/carts"



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
            <p>Are you ready to Checkout your items?</p>
            <p>Please Review your items before preceding</p>
            <div>
                <button onClick={() => closeModal()}>go back to cart</button>
                <button onClick={() => handleSubmit()}>Confirm</button>
            </div>
        </div>
    )
}

export default CheckoutModel
