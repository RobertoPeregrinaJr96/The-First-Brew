import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';

const ItemModal = ({ coffee }) => {

    // const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()


    const handleSubmit = (e) => {

    }

    return (
        <div className='checkout-div-wrapper'>

        </div>
    )
}

export default ItemModal
