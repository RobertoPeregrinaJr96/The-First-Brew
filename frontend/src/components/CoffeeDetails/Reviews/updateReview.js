import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchAllCoffeeReviewThunk, fetchUpdateReviewThunk } from '../../../store/review';
import { useModal } from '../../../context/Modal'
import './index.css'

const UpdateReview = ({ coffee, user, review }) => {

    console.log("coffee in COFFEE Detail", coffee)
    console.log("user in  COFFEE Detail", user)
    console.log("review in  COFFEE Detail", review)

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

        if (newReview.length === 0) err.review = "Must be between 1 and 255 characters"
        if (newReview.length >= 255) err.review = "Must be between 1 and 255 characters"
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
            console.log("NEW EWCIWIQ", updatedReview)
            dispatch(fetchUpdateReviewThunk(updatedReview, review.id))
            dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
            dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
            closeModal()
        }
        console.log("Review Format is Incorrect")
        setErrors(err)
    }


    return (
        <div className="coffee-detail-wrapper">
            <form className='coffee-detail-form' onSubmit={(e) => handleSubmit(e)} >
                <p className='errors'>{errors.title}</p>
                <label>
                    <input
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    >
                    </input>
                </label>
                <p className='errors'>{errors.review}</p>
                <label>
                    <textarea
                        placeholder="Review"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    >
                    </textarea>

                </label>
                <div className='update-div-buttons'>
                    <button
                        //  disabled={!!Object.values(errors)}
                        type='submit'>
                        Submit
                    </button>
                    <button onClick={(e) => closeModal()}> Cancel
                    </button>
                </div>
            </form>

        </div >
    )
}

export default UpdateReview
