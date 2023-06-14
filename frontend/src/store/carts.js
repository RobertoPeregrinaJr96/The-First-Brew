import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_CART = 'cart/GET_CART'


/* Action Creators: */
export const getAllCart = (carts) => ({
    type: GET_CART,
    carts
})




/* Thunk Creators: */
export const fetchUserCartThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/cart')
    // console.log("fetch response:", response)
    if (response.ok) {
        const carts = await response.json()
        // console.log("Carts in Thunk:", carts)
        dispatch(getAllCart(carts))
        return carts
    }
}



/* Reducers */

const initialState = { allCarts: {}, userCart: {} }

const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_CART:
            // console.log("Action:", action.carts)
            const getState = { ...state, allCarts: { ...state.allCarts } }
            // console.log("getState:", getState)
            action.carts.ShoppingCart.forEach(cart => getState.allCarts[cart.id] = cart)
            return { ...getState }
        default:
            return state
    }

}

export default cartReducer
