import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ItemModal = ({ coffee }) => {
    // general Variables
    // const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const history = useHistory()
    // Specific Variables

    // Functions
    const handleSubmit = (e) => {

    }

    const coffeeNav = () => {
        history.push(`/coffee/${coffee.id}`)
        closeModal()
    }

    return (
        <div className='checkout-div-wrapper'>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>


            <p onClick={(e) => coffeeNav()}>For More Info</p>
        </div>
    )
}

export default ItemModal
