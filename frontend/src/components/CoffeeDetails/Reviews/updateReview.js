import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoffeeReviewThunk, fetchUpdateReviewThunk } from '../../../store/review';
import { useModal } from '../../../context/Modal'
import './index.css'

const UpdateReview = ({ coffee, user, review }) => {

    // console.log("coffee in COFFEE Detail", coffee)
    // console.log("user in  COFFEE Detail", user)
    // console.log("review in  COFFEE Detail", review)

    // general Variables
    const dispatch = useDispatch()
    const [newTitle, setNewTitle] = useState(review?.title)
    const [newRating, setNewRating] = useState(review?.rating)
    const [newReview, setNewReview] = useState(review.review)
    const [errors, setErrors] = useState({})
    const { closeModal } = useModal()

    const coffeeReviews = useSelector(state => state.review.coffeeReviews)
    // console.log("coffeeReviews:", coffeeReviews)
    const coffeeReviewArr = Object.values(coffeeReviews)
    // console.log("Arr:", coffeeReviewArr)



    const handleSubmit = (e) => {
        e.preventDefault();
        const err = {}

        if (newReview.length === 0) err.review = "Must be between 1 and 1000 characters"
        if (newReview.length >= 1000) err.review = "Must be between 1 and 1000 characters"
        if (newRating <= 0) err.rating = "Must be between 1 and 10"
        if (newRating > 10) err.rating = "Must be between 1 and 10"
        if (newTitle.length === 0) err.title = "Must be between 1 and 30"
        if (newTitle.length >= 30) err.title = "Must be between 1 and 30"

        if (Object.values(err).length === 0) {
            console.log("Review Format is Correct")
            const updatedReview = {
                "coffeeId": review.coffeeId,
                "userId": review.userId,
                "title": newTitle,
                "rating": newRating,
                "review": newReview,
            }
            // console.log("NEW EWCIWIQ", updatedReview)
            dispatch(fetchUpdateReviewThunk(updatedReview, review.id))
            dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
            dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
            closeModal()
        }
        console.log("Review Format is Incorrect")
        setErrors(err)
    }


    return (
        <div className="review-update-wrapper">
                <p className='review-post-p'>Update Your Review</p>
            <form className='review-update-form' onSubmit={(e) => handleSubmit(e)} >
                <p className='character-errors'>{errors.title}</p>
                <div className='review-update-div-wrapper'>
                    <label for='title'>
                        Title
                    </label>
                    <input
                        className='review-update-input'
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        name='title'
                    >
                    </input>
                </div>
                <p className='character-counter'>{newTitle?.length}/30</p>

                <p className='character-errors'>{errors.review}</p>
                <div className='review-update-div-wrapper'>
                    <label for='review'>
                        Review
                    </label>
                    <textarea
                        className='review-update-textarea'
                        placeholder="Review"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        name='review'
                    >
                    </textarea>
                </div>
                <p className='character-counter'>{newReview?.length}/1000</p>

                <div className='review-update-div-buttons'>
                    <div className='bttn-update-div'>
                        <button
                            className='post-submit'
                            onClick={(e) => closeModal()}>
                            Cancel
                        </button>

                    </div>
                    <div className='bttn-update-div'>
                        <button
                            //  disabled={!!Object.values(errors)}
                            className='post-cancel'
                            type='submit'>
                            Submit

                        </button>

                    </div>
                </div>
            </form>

        </div >
    )
}

export default UpdateReview
