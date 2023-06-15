import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css'
import { fetchOneCoffeeThunk } from '../../store/coffee';



const CoffeeById = () => {

    const dispatch = useDispatch();
    const coffeeIdObj = useParams();
    const coffeeId = coffeeIdObj.coffeeId
    const coffeeObj = useSelector(state => state.coffee.singleCoffee)

    useEffect(() => {
        dispatch(fetchOneCoffeeThunk(coffeeId))
    }, [dispatch])

    // if (!coffee && coffeeObj && coffeeArr) return null

    return (
        <div>
            <h2>HELLO FROM COFFEE DETAILS</h2>
            <h1>{coffeeObj.name},  price:{coffeeObj.price}</h1>
        </div>
    )
}

export default CoffeeById
