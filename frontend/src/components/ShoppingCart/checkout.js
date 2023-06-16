import OpenModalButton from '../OpenModalButton/index'
import CheckoutModel from './checkoutModal'
import "./index.css"


const Checkout = ({ items }) => {
    return (
        <div>
            <OpenModalButton buttonText={'Checkout'} modalComponent={<CheckoutModel items={items} />}></OpenModalButton>
        </div>

    )
}

export default Checkout
