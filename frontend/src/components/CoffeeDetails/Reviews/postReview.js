import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCoffeeReviewThunk, fetchPostOneReview, fetchAllReviewThunk } from '../../../store/review';
import { useModal } from '../../../context/Modal'
import './index.css'

const PostReview = ({ coffee, user }) => {

    // console.log("coffee in Detail", coffee)
    // console.log("user in Detail", user)

    // general Variables
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)
    const [errors, setErrors] = useState({})
    const [bool, setBool] = useState(false)
    const { closeModal } = useModal()

    const coffeeReviews = useSelector(state => state.review.coffeeReviews)
    // console.log("coffeeReviews:", coffeeReviews)
    const coffeeReviewArr = Object.values(coffeeReviews)
    // console.log("Arr:", coffeeReviewArr)



    const handleSubmit = (e) => {
        e.preventDefault();
        const err = {}

        if (review.length === 0) err.review = "Must be between 1 and 1000 characters"
        if (review.length >= 1000) err.review = "Must be between 1 and 1000 characters"
        if (rating <= 0) err.rating = "Must be between 1 and 10"
        if (rating > 10) err.rating = "Must be between 1 and 10"
        if (title.length === 0) err.title = "Must be between 1 and 30"
        if (title.length >= 30) err.title = "Must be between 1 and 30"
        setErrors(err)

        if (Object.values(err).length === 0) {
            console.log("Review Format is Correct")
            const newReview = {
                "coffeeId": Number(coffee.coffeeId),
                "userId": user.id,
                "title": title,
                "rating": Number(rating),
                "review": review,
            }
            // console.log("NEW EWCIWIQ", newReview)
            dispatch(fetchPostOneReview(newReview, coffee.coffeeId))
            dispatch(fetchAllCoffeeReviewThunk(coffee.coffeeId))
            setBool(!bool)
            closeModal()
        }
        console.log("Review Format is Incorrect")
        // closeModal()
    }

    console.log("ERRORS:", errors)
    return (
        <div className="review-post-wrapper">
            <form className='review-post-form' onSubmit={(e) => handleSubmit(e)} >
                <label>
                    Title
                    <input
                        className='review-post-input'
                        title='Please enter a title between 1 to 30 characters long'
                        placeholder="Title"
                        onChange={(e) => setTitle(e.target.value)}
                        type='Text'
                        min={1} max={30}
                    >
                    </input>
                    <p className='character-counter'>{title?.length}/30</p>
                    <p className='errors'>{errors.title}</p>
                </label>
                <label>
                    Review
                    <textarea
                        className='review-post-textarea'
                        title='Please write a review between 1 to 1000 characters long'
                        placeholder="Review"
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                    <p className='character-counter'>{review?.length}/1000</p>
                </label>
                <p className='errors'>{errors.review}</p>
                <div className='review-post-div-buttons'>
                    <button className='post-submit' onClick={(e) => closeModal()}> Cancel
                    </button>
                    <button
                        className='post-cancel'
                        type='submit'>Submit
                    </button>
                </div>


            </form>

        </div >
    )
}

export default PostReview
