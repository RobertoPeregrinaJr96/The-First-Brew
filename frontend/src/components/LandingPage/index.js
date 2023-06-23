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
            <h1 className='landingPage-h1'>Hello {user?.firstName} {user?.lastName}</h1>

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
                            <p className='filler-p1'> Welcome to our cozy and cherished neighborhood coffee haven! Nestled in the heart of our community, our humble coffee shop is a beacon of warmth and the perfect retreat for all coffee aficionados. While we may specialize in just one thing—coffee—we pour our hearts into every cup, creating an experience that keeps locals coming back for more.</p>

                        </div>
                    </div>
                    <div className='landingPage-img-div1'>
                        <div className='filler1'>
                            <p className='filler-p1'>   Step inside and be enveloped by the rich aromas of freshly brewed beans, lovingly sourced from sustainable and ethical growers. Our skilled baristas, armed with their passion and expertise, transform these beans into liquid gold, crafting exquisite cups of coffee that awaken the senses and delight the palate.
                            </p>

                        </div>
                    </div>
                </div>
                <div className='filler2'>
                    <p className='filler-p2'>


                        But our coffee shop is more than just a place to grab your daily dose of caffeine. It's a gathering spot where friendships are forged and stories are shared. Our walls reverberate with laughter, animated conversations, and the hum of community connections being formed. Whether you're a busy professional seeking a quick jolt of energy or a laid-back local savoring the company of friends, our doors are open to all.

                        Here, time slows down as you take a moment to savor the simple pleasures. Cozy up in one of our comfortable nooks, the gentle melodies of soulful music filling the air, as you lose yourself in the pages of a good book or simply watch the world go by through our large windows. Our inviting ambiance is a sanctuary where you can escape the hustle and bustle of everyday life and find solace in a comforting cup of joe.

                        At our coffee shop, we pride ourselves on not only serving exceptional coffee but also fostering a sense of community. We celebrate local artists by showcasing their talent on our walls, and we support nearby businesses by partnering with them to offer delectable treats that perfectly complement our beverages.

                        So, whether you're seeking the familiar warmth of your favorite brew or looking to expand your coffee horizons with our ever-evolving selection of specialty blends, we invite you to join us at our beloved coffee shop—a place where coffee is more than just a beverage; it's a conduit for connection, friendship, and the simple joys that make life beautiful.</p>

                </div>
            </div>
        </div>
    )
}

export default SplashPage
