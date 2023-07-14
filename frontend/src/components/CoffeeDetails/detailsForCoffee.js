import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostReview from './Reviews/postReview';
import DeleteReview from './Reviews/deleteReview';
import OpenModalButton from '../OpenModalButton'
import './index.css'
import { fetchAllCoffeeReviewThunk } from '../../store/review';
import UpdateReview from './Reviews/updateReview';



const CoffeeDetail = ({ coffee, user }) => {

    const dispatch = useDispatch()
    const coffeeReviews = useSelector(state => state.review.coffeeReviews)
    const coffeeReviewArr = Object.values(coffeeReviews)

    const switchPost = () => {
        let userReview = coffeeReviewArr.find(review => review.userId === user.id)
        if (!userReview) {
            return <OpenModalButton buttonText={'Post Your Review'} modalComponent={<PostReview coffee={coffee} user={user} />}></OpenModalButton>
        }
        if (userReview) {
            return <OpenModalButton buttonText={'Update Your Review'} modalComponent={<UpdateReview coffee={coffee} user={user} review={userReview} />}></OpenModalButton>
        }

    }


    useEffect(() => {
        dispatch(fetchAllCoffeeReviewThunk(coffee?.coffeeId))
    }, [dispatch, coffee.id])

    return (
        <div className="coffee-detail-wrapper">
            <div className='coffee-detail-button-switch'>
                {switchPost()}
            </div>
            <div className='coffee-detail-div-ul-wrapper'>

                <ul className='coffee-detail-ul'>
                    {coffeeReviewArr?.reverse()?.map(review => {
                        return <li key={review?.id}>

                            <div>
                                <img className='review-user-img' src={`${review?.User['profileImageUrl']}`} />
                                {'   '}
                                {(review?.User["firstName"])[0].toUpperCase()}
                                {(review?.User["firstName"]).slice(1)}
                                {"  "}
                                {review?.User["lastName"]}
                                {" : "}
                                <p>{review?.title}</p>
                                <p>{review?.review}</p>
                                {user?.id == review?.userId ? <OpenModalButton buttonText={'Delete Your Review'} modalComponent={<DeleteReview coffee={coffee} review={review} user={user} />}></OpenModalButton> : <></>}

                            </div>

                        </li>
                    })}
                </ul>
            </div>
        </div >
    )
}

export default CoffeeDetail
