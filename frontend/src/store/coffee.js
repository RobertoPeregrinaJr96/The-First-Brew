import { csrfFetch } from "./csrf";

/* Action Type Constants: */
export const GET_COFFEE = 'coffee/GET_COFFEE'
export const GET_ONE_COFFEE = 'coffee/GET_ONE_COFFEE'

/* Action Creators: */
export const getAllCoffee = (coffee) => ({
    type: GET_COFFEE,
    coffee
})
export const getOneCoffee = (coffee) => ({
    type: GET_ONE_COFFEE,
    coffee
})


/* Thunk Creators: */
export const fetchAllCoffeeThunk = () => async (dispatch) => {

    const response = await csrfFetch('/api/coffee')
    // console.log("fetch response:", response)
    if (response.ok) {
        const coffee = await response.json()
        dispatch(getAllCoffee(coffee))
        return coffee
    }
}
export const fetchOneCoffeeThunk = (id) => async (dispatch) => {

    console.log("fetch id In Thunk:", id)
    const response = await csrfFetch(`/api/coffee/${id}`)
    console.log("fetch response:", response)
    if (response.ok) {
        const coffee = await response.json()
        dispatch(getOneCoffee(coffee))
        return coffee
    }
}

/* Reducers */

const initialState = { allCoffee: {}, singleCoffee: {} }

const coffeeReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_COFFEE:
            console.log("Action:", action.carts)
            const getState = { ...state, allCoffee: { ...state.allCoffee } }
            action.coffee.Coffee.forEach(coffee => getState.allCoffee[coffee.id] = coffee)
            return { ...getState }
        case GET_ONE_COFFEE:
            const getOneState = { ...state, singleCoffee: { ...action.coffee } }
            return getOneState
        default:
            return state
    }

}

export default coffeeReducer
