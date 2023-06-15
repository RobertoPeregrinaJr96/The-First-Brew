import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_ITEMS = 'items/GET_ITEMS'
export const GET_ONE_ITEM = 'items/GET_ONE_ITEM'
export const POST_ONE_ITEM = 'items/POST_ONE_ITEM'
/* Action Creators: */
export const getAllItems = (items) => ({
    type: GET_ITEMS,
    items
})
export const getOneItem = (item) => ({
    type: GET_ONE_ITEM,
    item
})
export const postOneItem = (item) => ({
    type: POST_ONE_ITEM,
    item
})

/* Thunk Creators: */
export const fetchAllItemsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/items')
    // console.log("fetch response:", response)
    if (response.ok) {
        const items = await response.json()
        dispatch(getAllItems(items))
        return items
    }
}
export const fetchOneItemThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/items/${id}`)
    // console.log("fetch response:", response)
    if (response.ok) {
        const item = await response.json()
        dispatch(getOneItem(item))
        return item
    }
}
export const fetchPostOneItem = (coffeeId, cartId) => async (dispatch) => {
    console.log("coffeeId", coffeeId)
    console.log("cartId", cartId)
    const response = await csrfFetch(`/api/coffee/${coffeeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({coffeeId,cartId})
    })
    console.log("response", response)
    if (response.ok) {
        const item = await response.json()
        console.log("item", item)
        dispatch(postOneItem(item))
        return item
    }

}


/* Reducers */

const initialState = { allItems: {}, singleItem: {} }

const itemReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_ITEMS:
            // console.log("Action:", action.items)
            const getState = { ...state, allItems: { ...state.allItems } }
            action.items.Item.forEach(item => getState.allItems[item.id] = item)
            return { ...getState }
        case GET_ONE_ITEM:
            const getOneState = { ...state, singleItem: { ...action.item } }
            return getOneState
        default:
            return state
    }

}

export default itemReducer
