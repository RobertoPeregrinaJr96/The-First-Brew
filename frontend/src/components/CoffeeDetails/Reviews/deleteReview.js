import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchAllCoffeeReviewThunk, fetchDeleteReviewThunk } from '../../../store/review'
import { useModal } from '../../../context/Modal'
import './index.css'



const DeleteReview = ({ coffee, review }) => {
    console.log('coffee in DeleteReviewModal', coffee)
    console.log('review in DeleteReviewModal', review)

    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [goober, setGoober] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(fetchDeleteReviewThunk(review.id))
        dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
        setGoober(true)
        setTimeout(() => {
            setGoober(false)
        }, 300)
        closeModal()
    }

    return (
        <div disabled={goober} className='delete-Modal-div'>
            <button onClick={(e) => handleSubmit(e)}>
                Delete
            </button>
        </div>
    )
}

export default DeleteReview;
