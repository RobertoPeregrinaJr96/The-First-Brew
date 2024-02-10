import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import cartReducer from "./carts";
import coffeeReducer from "./coffee";
import itemReducer from "./item";
import reviewReducer from "./review";
import userReducer from "./user";

const rootReducer = combineReducers({
  session: sessionReducer,
  cart: cartReducer,
  coffee: coffeeReducer,
  item: itemReducer,
  review: reviewReducer,
  user: userReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
