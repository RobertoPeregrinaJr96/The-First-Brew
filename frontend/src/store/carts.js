import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_CART = 'cart/GET_CART'
export const GET_ONE_CART = 'cart/GET_ONE_CART'
/* Action Creators: */
export const getAllCart = (carts) => ({
    type: GET_CART,
    carts
})
export const getOneCart = (cart) => ({
    type: GET_ONE_CART,
    cart
})



/* Thunk Creators: */
export const fetchAllCartThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/cart')
    // console.log("fetch response:", response)
    if (response.ok) {
        const carts = await response.json()
        // console.log("Carts in Thunk:", carts)
        dispatch(getAllCart(carts))
        return carts
    }
}
export const fetchUserCartThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/cart/current`)
    // console.log("fetch response:", response)
    if (response.ok) {
        const cart = await response.json()
        // console.log(cart)
        dispatch(getOneCart(cart.UserCart))
        return cart
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
        case GET_ONE_CART:
            // console.log(action.cart)
            const getOneState = { ...state, userCart: { ...action.cart } }
            return getOneState
        default:
            return state
    }

}

export default cartReducer
