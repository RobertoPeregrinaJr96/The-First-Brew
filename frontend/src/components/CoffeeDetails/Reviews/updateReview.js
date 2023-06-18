import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchAllCoffeeReviewThunk, fetchUpdateReviewThunk, fetchAllReviewThunk } from '../../../store/review';
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
    const [bool, setBool] = useState(false)
    const { closeModal } = useModal()

    const coffeeReviews = useSelector(state => state.review.coffeeReviews)
    // console.log("coffeeReviews:", coffeeReviews)
    const coffeeReviewArr = Object.values(coffeeReviews)
    // console.log("Arr:", coffeeReviewArr)



    const handleSubmit = (e) => {
        e.preventDefault();
        const err = {}

        if (newReview.length === 0) err.review = ""
        if (newReview.length >= 255) err.review = ""
        if (newRating <= 0) err.rating = ""
        if (newRating > 10) err.rating = ""
        if (newTitle.length === 0) err.title = ""
        if (newTitle.length >= 30) err.title = ""

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
            setBool(!bool)
            return
        }
        console.log("Review Format is Incorrect")
        setErrors(err)
        closeModal()
    }


    return (
        <div className="coffee-detail-wrapper">
            <form className='coffee-detail-form' onSubmit={(e) => handleSubmit(e)} >

                <label>
                    <input
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    >

                    </input>
                </label>
                <label>
                    <textarea
                        placeholder="Review"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    >

                    </textarea>

                </label>
                <button type='submit'></button>
            </form>

        </div >
    )
}

export default UpdateReview
