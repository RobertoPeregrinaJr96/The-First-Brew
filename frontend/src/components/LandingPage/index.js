import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './index.css';
import { fetchAllCoffeeThunk } from '../../store/coffee';
import OpenModalButton from '../OpenModalButton';
import ItemModal from './quickItemModal';
import { fetchUserCartThunk } from '../../store/carts';
import { Carousel } from 'react-responsive-carousel';


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
            <div className='landingPage-div-h1'>

                <div className='mega-div-ul-wrapper'>
                    <Carousel autoPlay stopOnHover emulateTouch infiniteLoop useKeyboardArrows className='landingPage-carousel'>
                        {coffees.map(coffee => {
                            return (
                                <>
                                    <img className='coffee-img-carousel' src={`${coffee.CoffeeImages[0].img}`} />
                                    {/* <div className={'coffee-div-img'} >

                                        <div className='item-modal-li-div' >
                                            <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} user={user} className='lol' />}>
                                            </OpenModalButton>
                                        </div>
                                    </div> */}
                                </>
                            )

                        })}
                    </Carousel>
                </div>
                {coffees.map(coffee => {
                    return (
                        <>
                            <div className={'coffee-div-img'} >

                                <div className='item-modal-li-div' >
                                    <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} user={user} className='lol' />}>
                                    </OpenModalButton>
                                </div>
                            </div>

                        </>
                    )

                })}
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
                        <div className='filler2-bg-img'>
                            <p className='filler-p2'>
                                Our coffee shop is more than just a place to grab your daily dose of caffeine. It's a gathering spot where friendships are forged and stories are shared. Our walls reverberate with laughter, animated conversations, and the hum of community connections being formed. Whether you're a busy professional seeking a quick jolt of energy or a laid-back local savoring the company of friends, our doors are open to all.
                                .</p>
                            <div id="links-wrapper">
                                <p>Meet the Developer:</p>
                                <p>Roberto Peregrina Jr</p>
                                <div className='dev-links'>
                                    <a href="https://www.linkedin.com/in/roberto-peregrina/"><i class="fa-brands fa-linkedin"></i></a>
                                    <a href="https://github.com/RobertoPeregrinaJr96"><i class="fa-brands fa-github"></i></a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default SplashPage
