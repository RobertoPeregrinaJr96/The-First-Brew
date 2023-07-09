// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
export const POST_NEW_CART = 'session/POST_NEW_CART'
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};
export const postNewCart = (cart) => ({
  type: POST_NEW_CART,
  cart
})
//  POST a cart upon user sign up
export const fetchPostUserCart = () => async (dispatch) => {
  // console.log("---------------------------")
  // console.log("---------------------------")
  const response = await csrfFetch("/api/session/user/cart", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })
  // console.log(response)
  if (response.ok) {
    const cart = await response.json()
    // console.log(cart)
    dispatch(postNewCart(cart))
    // console.log("---------------------------")
    // console.log("---------------------------")
    return cart
  }
}
// log in User
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
//
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};
//
export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password, image, phone, } = user;
  const formData = new FormData();
  formData.append("username", username)
  formData.append("firstName", firstName)
  formData.append("lastName", lastName)
  formData.append("email", email)
  formData.append("password", password)
  if (image) formData.append("image", image);
  else formData.append("image", null)
  if (phone) formData.append("phone", phone);
  else formData.append("phone", null)
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: formData
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  dispatch(fetchPostUserCart())
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
