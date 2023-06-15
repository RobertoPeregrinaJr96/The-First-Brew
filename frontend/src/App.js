import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

// my components
import SplashPage from './components/LandingPage/index'
import ShoppingCart from './components/ShoppingCart/index'
import CoffeeById from './components/CoffeeDetails/index'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path='/' component={SplashPage} />
        <Route exact path='/cart' component={ShoppingCart} />
        <Route exact path='/coffee/:coffeeId' component={CoffeeById} />
      </Switch>}
    </>
  );
}

export default App;
