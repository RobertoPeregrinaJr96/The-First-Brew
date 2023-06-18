import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import PostReview from './Reviews/postReview';
import DeleteReview from './Reviews/deleteReview';
import OpenModalButton from '../OpenModalButton'
import './index.css'
import { fetchAllCoffeeReviewThunk } from '../../store/review';
import UpdateReview from './Reviews/updateReview';



const CoffeeDetail = ({ coffee, user }) => {

    // console.log("coffee:", coffee)
    // console.log("user:", user)

    const dispatch = useDispatch()
    const coffeeReviews = useSelector(state => state.review.coffeeReviews)
    // console.log("coffeeReviews:", coffeeReviews)
    const coffeeReviewArr = Object.values(coffeeReviews)
    // console.log("Arr:", coffeeReviewArr)
    const sortedArr = coffeeReviewArr.sort((a, b) => a.createdAt + b.createdAt)

    const switchPost = () => {
        let userReview = coffeeReviewArr.find(review => review.userId === user.id)

        // console.log("userReview:", userReview)

        if (!userReview) {
            // console.log("000")
            return <OpenModalButton buttonText={'Post Your Review'} modalComponent={<PostReview coffee={coffee} user={user} />}></OpenModalButton>
        }
        if (userReview) {
            // console.log("100")
            return <OpenModalButton buttonText={'Update Your Review'} modalComponent={<UpdateReview coffee={coffee} user={user} review={userReview} />}></OpenModalButton>
        }

    }


    useEffect(() => {
        dispatch(fetchAllCoffeeReviewThunk(coffee?.coffeeId))
    }, [dispatch])

    return (
        <div className="coffee-detail-wrapper">
            <div className='coffee-detail-button-switch'>
                {switchPost()}
            </div>
            <ul>
                {sortedArr.map(review => {
                    return <li key={review?.id}>
                        <p>{review?.title}</p>
                        <p>{review?.review}</p>
                        <OpenModalButton buttonText={'Delete Your Review'} modalComponent={<DeleteReview coffee={coffee} review={review} />}></OpenModalButton>
                    </li>
                })}
            </ul>
        </div >
    )
}

export default CoffeeDetail
