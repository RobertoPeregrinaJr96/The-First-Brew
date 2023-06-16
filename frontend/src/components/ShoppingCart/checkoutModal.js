import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { fetchDeleteItemThunk } from "../../store/item"
import { fetchUserCartThunk } from "../../store/carts"



const CheckoutModel = ({ items }) => {

    const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleSubmit = (e) => {
        e.preventDefault()
        items.map(item => {
            dispatch(fetchDeleteItemThunk(item.id))
        })
        setBoolean(!boolean)
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
                <button onClick={(e) => handleSubmit(e)}>Confirm</button>
            </div>
        </div>
    )
}

export default CheckoutModel
