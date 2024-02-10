import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_ITEMS = 'items/GET_ITEMS'
export const GET_ONE_ITEM = 'items/GET_ONE_ITEM'
export const POST_ONE_ITEM = 'items/POST_ONE_ITEM'
export const UPDATE_ITEM = 'item/UPDATE_ITEM'
export const DELETE_ITEM = 'item/DELETE_ITEM'
export const UPDATE_INSTRUCTIONS = 'item/UPDATE_INSTRUCTIONS'

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
export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    item
})
export const deleteItem = (item) => ({
    type: DELETE_ITEM,
    item
})

/* Thunk Creators: */
// GET
export const fetchAllItemsThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/items')
    if (response.ok) {
        const items = await response.json()
        console.log('items in thunk', items)
        dispatch(getAllItems(items))
        return items
    }
}
// GET
export const fetchOneItemThunk = (id) => async (dispatch) => {

    const response = await csrfFetch(`/api/items/${id}`)
    // console.log("fetch response:", response)
    if (response.ok) {
        const item = await response.json()
        dispatch(getOneItem(item))
        return item
    }
}
// Post
export const fetchPostOneItem = (coffeeId, cartId, instructions) => async (dispatch) => {
    console.log("coffeeId", coffeeId)
    console.log("cartId", cartId)
    console.log("instructions", instructions)
    const response = await csrfFetch(`/api/coffee/${coffeeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coffeeId, cartId, instructions })
    })
    console.log("response", response)
    if (response.ok) {
        const item = await response.json()
        console.log("item", item)
        dispatch(postOneItem(item))
        return item
    }

}
// update a Item
export const fetchUpdateItemThunk = (item, id) => async (dispatch) => {
    // console.log("---------------------------------")
    // console.log("item:", item)
    // console.log("id:", id)
    // console.log("---------------------------------")
    const response = await csrfFetch(`/api/items/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
    });
    // console.log("Response ====>", response)
    // console.log("---------------------------------")
    if (response.ok) {
        const updatedItemObject = await response.json();
        // console.log("data ====>", updatedItem)
        // console.log("---------------------------------")
        dispatch(updateItem(updatedItemObject));
        return updatedItemObject;
    }
};
// delete a Item
export const fetchDeleteItemThunk = (id) => async (dispatch) => {
    // console.log("DELETE", id)
    const response = await csrfFetch(`/api/items/${id}`, {
        method: 'DELETE',
    });
    // console.log('res ====>', response)
    if (response.ok) {
        dispatch(deleteItem(id));
    }
};

export const fetchInstructionsUpdate = (id, array) => async (dispatch) => {
    console.log("---------------------------------")
    console.log("id:", id)
    console.log("array:", array)
    console.log("---------------------------------")
    const response = await csrfFetch(`/api/items/${id}/Instruction`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(array),
    });
    console.log("Response ====>", response)
    console.log("---------------------------------")
    if (response.ok) {
        const newItem = await response.json();
        console.log("updateItem ====>", newItem)
        console.log("---------------------------------")
        dispatch(updateItem(newItem));
        return newItem;
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
        case POST_ONE_ITEM:
            const postState = { ...state, allItems: action.item }
            return postState
        case UPDATE_ITEM:
            const updateState = { ...state, allItems: action.item }
            return updateState
        case DELETE_ITEM:
            const deleteState = { ...state, allItems: { ...state.allItems } }
            delete deleteState.allItems[action.item]
            return deleteState
        default:
            return state
    }

}

export default itemReducer
