import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import './index.css';
import { fetchAllCoffeeThunk } from '../../store/coffee';
import OpenModalButton from '../OpenModalButton';
import ItemModal from './quickItemModal';
import { fetchUserCartThunk } from '../../store/carts';

const SplashPage = () => {

    const dispatch = useDispatch();
    const history = useHistory()

    const coffeeObj = useSelector(state => state.coffee.allCoffee)
    const coffees = Object.values(coffeeObj)

    const user = useSelector(state => state.session.user)

    const compClick = (coffee, user) => {
        <OpenModalButton>
            <ItemModal coffee={coffee} user={user} />
        </OpenModalButton>
    }

    useEffect(() => {
        dispatch(fetchAllCoffeeThunk())
        if (user) dispatch(fetchUserCartThunk(user?.id))

    }, [dispatch])

    return (
        <div className='landingPage-wrapper bg'>
            <h1>Hello</h1>

            <ul className='landingPage-ul'>
                {coffees.map(coffee => {
                    // return <li key={coffee.id} className='item-modal-li'>
                    //     <div className='item-modal-li-div'>
                    //         <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} user={user} />}>
                    //         </OpenModalButton>
                    //     </div>
                    // </li>
                    return <li key={coffee.id} className={`item-modal-li ${(coffee.name)?.toLowerCase()}`}>
                        <div className='item-modal-li-div' >
                            <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} user={user} />}>
                            </OpenModalButton>
                        </div>
                    </li>
                })}
            </ul>
            <div className='mega-div-img-wrapper'>
                <div className='mega-div-img-wrapper2'>
                    <div className='landingPage-img-div1'>
                        <div className='filler1'>
                            <p className='filler-p1'> </p>

                        </div>
                    </div>
                    <div className='landingPage-img-div1'>
                        <div className='filler1'>
                            <p className='filler-p1'> </p>

                        </div>
                    </div>
                </div>
                <div className='filler2'>
                    <p className='filler-p2'> </p>

                </div>
            </div>
        </div>
    )
}

export default SplashPage
