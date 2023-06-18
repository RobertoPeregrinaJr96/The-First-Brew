import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_REVIEWS = 'review/GET_REVIEWS'
export const GET_ONE_REVIEW = 'review/GET_ONE_REVIEW'
export const GET_COFFEE_REVIEW = 'review/GET_COFFEE_REVIEW'
export const POST_ONE_REVIEW = 'review/POST_ONE_REVIEW'
export const UPDATE_REVIEW = 'review/UPDATE_REVIEW'
export const DELETE_REVIEW = 'review/DELETE_REVIEW'

/* Action Creators: */
export const getAllReview = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})
export const getOneReview = (review) => ({
    type: GET_ONE_REVIEW,
    review
})
export const getCoffeeReviews = (reviews) => ({
    type: GET_COFFEE_REVIEW,
    reviews
})
export const postOneReview = (review) => ({
    type: POST_ONE_REVIEW,
    review
})
export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    review
})
export const deleteReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

/* Thunk Creators: */
// Get All Reviews
export const fetchAllReviewThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/reviews')
    // console.log("fetch response:", response)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(getAllReview(reviews))
        return reviews
    }
}
//GET Coffee Reviews
export const fetchAllCoffeeReviewThunk = (coffeeId) => async (dispatch) => {
    // console.log("coffeeId In Thunk", coffeeId)
    const response = await csrfFetch(`/api/coffee/${coffeeId}/reviews`)
    // console.log("Response In Thunk", response)
    if (response.ok) {
        const reviews = await response.json()
        dispatch(getCoffeeReviews(reviews))
        return reviews
    }

}
// Get Users Review
export const fetchUsersReviewThunk = () => async (dispatch) => {

    const response = await csrfFetch(`/api/reviews/current`)
    // console.log("fetch response:", response)
    if (response.ok) {
        const review = await response.json()
        dispatch(getOneReview(review))
        return review
    }
}
// POST A Review
export const fetchPostOneReview = (review, coffeeId) => async (dispatch) => {
    // console.log("coffeeId", coffeeId)
    // console.log("review", review)
    const response = await csrfFetch(`/api/coffee/${coffeeId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review })
    })
    // console.log("response", response)
    if (response.ok) {
        const review = await response.json()
        // console.log("review", review)
        dispatch(postOneReview(review))
        return review
    }

}
// update a Review
export const fetchUpdateReviewThunk = (review, id) => async (dispatch) => {
    console.log("---------------------------------")
    console.log("review:", review)
    console.log("id:", id)
    console.log("---------------------------------")
    const response = await csrfFetch(`/api/reviews/${id}/reviews`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    console.log("Response ====>", response)
    console.log("---------------------------------")
    if (response.ok) {
        const updatedReview = await response.json();
        console.log("data ====>", updatedReview)
        console.log("---------------------------------")
        dispatch(updateReview(updatedReview));
        return updatedReview;
    }
};
// delete a Review
export const fetchDeleteReviewThunk = (id) => async (dispatch) => {
    console.log("DELETE", id )
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE',
    });
    // console.log('res ====>', response)
    if (response.ok) {
        const message = await response.json()
        console.log("message", message)
        dispatch(deleteReview(id));
    }
};

/* Reducers */
const initialState = { allReviews: {}, singleReview: {}, coffeeReviews: {} }

const reviewReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_REVIEWS:
            // console.log("Action:", action.review)
            const getState = { ...state, allReviews: { ...state.allReviews } }
            // console.log("Action Action:", action.reviews)
            action.reviews.Reviews.forEach(review => getState.allReviews[review.id] = review)
            return { ...getState }
        case GET_ONE_REVIEW:
            const getOneState = { ...state, singleReview: { ...action.review } }
            return getOneState
        case GET_COFFEE_REVIEW:
            const coffeeState = { ...state, coffeeReviews: { ...state.coffeeReviews } }
            // console.log("Reducker", action.reviews)
            action.reviews.forEach(review => coffeeState.coffeeReviews[review.id] = review)
            // console.log("state Reducker", coffeeState)
            return coffeeState
        case DELETE_REVIEW:
            const deleteState = { ...state, singleReview: { ...state.singleReview } }
            delete deleteState.allReviews[action.review]
            return deleteState
        default:
            return state
    }

}

export default reviewReducer
