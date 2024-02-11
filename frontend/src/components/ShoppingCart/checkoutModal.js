import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { fetchDeleteItemThunk } from "../../store/item"
import { fetchUserCartThunk } from "../../store/carts"
import './index.css'


const CheckoutModel = ({ items }) => {
    const [hidden, setHidden] = useState(false)
    const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleSubmit = async () => {
        if (items) {
            setHidden(!hidden)
            setTimeout(() => {
                if (items) {
                    items.map(item => {
                        dispatch(fetchDeleteItemThunk(item.id))
                    })

                }
                dispatch(fetchUserCartThunk())
                setBoolean(!boolean)
                setHidden(!hidden)
                closeModal()

            }, 1000);
        }
        dispatch(fetchUserCartThunk())

        // window.alert(" PLACEHOLDER : Your Cart has Successfully been Checkout")
    }


    useEffect(() => {
        dispatch(fetchUserCartThunk())
    }, [dispatch, boolean])

    if (!hidden) {
        return (
            <div className='checkout-div-wrapper'>
                <p></p>
                <p className='checkout-p'>Are you ready to Checkout your items?</p>
                <p className='checkout-p'>Please Review your items before preceding</p>
                <div className='checkout-button-div'>
                    <div className='checkout-buttons'>
                        <button className='checkout-button-cancel' onClick={() => closeModal()}>Cancel</button>

                    </div>
                    <div className='checkout-buttons'>
                        <button className='checkout-button-submit' onClick={() => handleSubmit()}>Confirm</button>

                    </div>
                </div>
            </div>
        )

    }
    if (hidden) {
        return (
            <div className='checkout-div-wrapper'>
                <p className='checkout-icon-p'>Checking out</p>
                <p>
                    <i class="fa-solid fa-circle-check fa-beat"  ></i>
                </p>
            </div>
        )
    }
}

export default CheckoutModel
