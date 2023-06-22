import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchAllCoffeeReviewThunk, fetchDeleteReviewThunk } from '../../../store/review'
import { useModal } from '../../../context/Modal'
import './index.css'



const DeleteReview = ({ coffee, review, user }) => {
    console.log('coffee in DeleteReviewModal', coffee)
    // console.log('review in DeleteReviewModal', review)

    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [goober, setGoober] = useState(false)

    // const user = useSelector(state => state.session.user)
    // const coffee = useSelector(state => state.singleCoffee)
    // const reviews = useSelector(state => state.coffeeReviews)
    // console.log("reviews", reviews)
    // console.log("user", reviews)
    // console.log("REVIEES", reviews)

    // let review;

    // if (reviews) {
    //     review = reviews?.find(review => review.userId == user.id)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(fetchDeleteReviewThunk(review?.id))
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

                <button
                    className='delete-cancel'
                    onClick={(e) => closeModal()}>
                    Cancel
                </button>
                <button
                    className='delete-submit'
                    onClick={(e) => handleSubmit(e)}>
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteReview;
