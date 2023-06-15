import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import './index.css';
import { fetchAllCoffeeThunk } from '../../store/coffee';



const SplashPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const coffeeObj = useSelector(state => state.coffee.allCoffee)
    const coffees = Object.values(coffeeObj)

    const itemPage = (e, coffee) => {
        e.preventDefault();
        history.push(`/coffee/${coffee.id}`)
    }

    useEffect(() => {
        dispatch(fetchAllCoffeeThunk())
    }, [dispatch])

    return (
        <div className='landingPage-wrapper'>
            <h1>Hello</h1>
            <ul>
                {coffees.map(coffee => {
                    return <li onClick={(e) => itemPage(e, coffee)}> {coffee.name}</li>
                })}
            </ul>
        </div>
    )
}

export default SplashPage
