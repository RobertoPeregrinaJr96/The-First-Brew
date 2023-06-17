import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import './index.css';
import { fetchAllCoffeeThunk } from '../../store/coffee';
import OpenModalButton from '../OpenModalButton';
import ItemModal from './quickItemModal';

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
                    return <li key={coffee.id}>
                        <div className='item-modal-li'>
                            <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} />}>
                            </OpenModalButton>
                        </div>

                    </li>
                })}
            </ul>
        </div>
    )
}

export default SplashPage
