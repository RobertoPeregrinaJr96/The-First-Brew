import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import './index.css'
import { fetchAllCoffeeReviewThunk, fetchDeleteReviewThunk } from '../../../store/review'
import { useModal } from '../../../context/Modal'
// import './index.css'
// import './review.css'



const DeleteReview = ({ coffee, review, user }) => {
    console.log('coffee in DeleteReviewModal', coffee)
    // console.log('review in DeleteReviewModal', review)

    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [goober, setGoober] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(fetchDeleteReviewThunk(review?.id))
        dispatch(fetchAllCoffeeReviewThunk(Number(coffee?.coffeeId)))
        dispatch(fetchAllCoffeeReviewThunk(Number(coffee?.coffeeId)))


        setGoober(true)

        setTimeout(() => {
            setGoober(false)
        }, 300)
        closeModal()
    }

    useEffect(() => {
        dispatch(fetchAllCoffeeReviewThunk(Number(coffee?.coffeeId)))
    }, [dispatch, goober])

    return (
        <div disabled={goober} className='delete-Modal-div'>
            <h1 className='delete-h1'>Do you want to Delete your review for {coffee?.name}</h1>
            <div className='review-delete-div-buttons '>
                <div className='delete-butt-div'>
                    <button
                        className='delete-cancel'
                        onClick={(e) => closeModal()}>
                        Cancel
                    </button>

                </div>
                <div className='delete-butt-div'>
                    <button
                        className='delete-submit'
                        onClick={(e) => handleSubmit(e)}>
                        Delete
                    </button>

                </div>
            </div>
        </div>
    )
}

export default DeleteReview;
