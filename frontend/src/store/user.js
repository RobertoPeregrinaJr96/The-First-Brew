import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const UPDATE_USER = 'cart/UPDATE_USER'
export const DELETE_USER = 'cart/DELETE_USER'
/* Action Creators: */
export const updateUser = (user) => ({
    type: UPDATE_USER,
    user
})
export const deleteUser = (user) => ({
    type: DELETE_USER,
    user
})
/* Thunk Creators: */
// update a user
export const fetchUpdateUserThunk = (user, id) => async (dispatch) => {
    // console.log("---------------------------------")
    console.log("user22222222:", user)
    console.log("id2222222222:", id)
    // console.log("---------------------------------")
    const response = await csrfFetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    console.log("Response ====>", response)
    // console.log("---------------------------------")
    if (response.ok) {
        const updatedUser = await response.json();
        console.log("data ====>", updatedUser)
        // console.log("---------------------------------")
        dispatch(updateUser(updatedUser));
        return updatedUser;
    }
};
// delete a user
export const fetchDeleteUserThunk = (id) => async (dispatch) => {
    // console.log("DELETE", id)
    const response = await csrfFetch(`/api/users/${id}`, {
        method: 'DELETE',
    });
    // console.log('res ====>', response)
    if (response.ok) {
        dispatch(deleteUser(id));
    }
};
/* reducers */

const initialState = { current: {} }

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case UPDATE_USER:

        case DELETE_USER:
    }
    return state
}

export default userReducer
