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

    const user = useSelector(state => state.session.user)
    console.log(user)
    const coffeeObj = useSelector(state => state.coffee.allCoffee)
    const coffees = Object.values(coffeeObj)


    const compClick = (coffee, user) => {
        <OpenModalButton>
            <ItemModal coffee={coffee} user={user} />
        </OpenModalButton>
    }

    useEffect(() => {
        if (user !== undefined && user !== null) {
            if (user !== undefined && user !== null) dispatch(fetchUserCartThunk())
        }
        dispatch(fetchAllCoffeeThunk())

    }, [dispatch])

    return (
        <div className='landingPage-wrapper bg'>
            <div className='landingPage-div-h1'>

                <div className='mega-div-ul-wrapper'>
                    <Carousel autoPlay stopOnHover emulateTouch infiniteLoop useKeyboardArrows className='landingPage-carousel'>
                        {coffees.map(coffee => {
                            return (
                                <>
                                    <img
                                        title={`${coffee?.name}`}
                                        className={`coffee-img-carousel ${coffee?.name}`} src={`${coffee?.CoffeeImages[0].img}`} />
                                </>
                            )

                        })}
                    </Carousel>
                </div>
                <div className={'coffee-div-img-wrapper'}>

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
                </div>
                <div className='landing-page-info-wrapper'>
                    <div className='landing-page-info-'>
                        <div className='landing-page-info-div-1'>
                            <p className='landing-page-info-div-p'> Welcome to our cozy and cherished neighborhood coffee haven! Nestled in the heart of our community, our humble coffee shop is a beacon of warmth and the perfect retreat for all coffee aficionados. While we may specialize in just one thing—coffee—we pour our hearts into every cup, creating an experience that keeps locals coming back for more. Our coffee shop is more than just a place to grab your daily dose of caffeine. It's a gathering spot where friendships are forged and stories are shared. Our walls reverberate with laughter, animated conversations, and the hum of community connections being formed. Whether you're a busy professional seeking a quick jolt of energy or a laid-back local savoring the company of friends, our doors are open to all step inside and be enveloped by the rich aromas of freshly brewed beans, lovingly sourced from sustainable and ethical growers. Our skilled baristas, armed with their passion and expertise, transform these beans into liquid gold, crafting exquisite cups of coffee that awaken the senses and delight the palate.</p>
                        </div>
                        <div className='landing-page-info-div'>
                        </div>
                    </div >
                    <div className='landing-page-info-'>
                        <div className='landing-page-info-div'>
                            <img className='landing-page-info-div-img' src='https://freeawsbucket.s3.us-west-1.amazonaws.com/coffee_seeders/stock_coffee_machine.jpg'></img>
                        </div>
                        <div className='landing-page-info-div-4'>
                            <div id="links-wrapper">
                                <p>Meet the Developer: <br />Roberto Peregrina Jr </p>
                            </div>
                            <div className='dev-links'>
                                <a target='_' href="https://www.linkedin.com/in/roberto-peregrina/">Linkedin:<i class="fa-brands fa-linkedin"></i></a>
                                <a target='_' href="https://github.com/RobertoPeregrinaJr96">Github:<i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SplashPage

    // < div className = { 'coffee-div-img'} >

    //     <div className='item-modal-li-div' >
    //         <OpenModalButton buttonText={coffee.name} modalComponent={<ItemModal coffee={coffee} user={user} className='lol' />}>
    //         </OpenModalButton>
    //     </div>
    //                                 </div >
