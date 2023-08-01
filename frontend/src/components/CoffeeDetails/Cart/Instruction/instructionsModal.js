import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { fetchPostOneItem } from '../../../../store/item';


const InstructionsModal = ({ coffeeId, cart }) => {

    const dispatch = useDispatch();


    const [size, setSize] = useState('Small')
    // console.log('size', size)
    const [milk, setMilk] = useState('2% Milk')
    // console.log('milk', milk)
    const [status, setStatus] = useState('Warm')
    // console.log('status', status)
    const [shot, setShot] = useState('None')
    // console.log('shot', shot)
    const [custom, setCustom] = useState()
    // console.log('custom', custom)
    const handleSubmit = (e) => {

        const instructions = {
            milk: milk.trim(),
            status: status.trim(),
            shot: shot.trim(),
            custom: custom.trim()
        }
        console.log("instructions", instructions)
        dispatch(fetchPostOneItem(coffeeId, cart?.id, instructions))

    }

    return (
        <>
            <form className='instructions-form' onSubmit={(e) => handleSubmit(e)}>
                {/* MILK */}
                <label for="item-Size">Size:</label>
                <select id="item-Size" onChange={(e) => setSize(e.target.value === '--Please choose an option--' ? 'Small' : e.target.value)}>
                    <option value="--Please choose an option--">--Please choose an option--</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="large">large</option>
                    <option value="Extra Large">Extra Large</option>
                    <option value="Gallon">Gallon</option>
                    <option value="Office (3 Gallons)">Office (3 Gallons)</option>
                </select>
                {/* Milk */}
                <label for="item-Milk">Milk:</label>
                <select id="item-Milk" onChange={(e) => setMilk(e.target.value === '--Please choose an option--' ? '2% Milk' : e.target.value)}>
                    <option value="--Please choose an option--">--Please choose an option--</option>
                    <option value="Heavy Cream">Heavy Cream</option>
                    <option value="Vanilla Sweet Cream">Vanilla Sweet Cream</option>
                    <option value="Nonfat Milk">Nonfat Milk</option>
                    <option value="2% Milk">2% Milk</option>
                    <option value="Whole Mlik">Whole Mlik</option>
                    <option value="Breve (Half & Half)">{`Breve (Half & Half)`}</option>
                    <option value="Almond">Almond</option>
                    <option value="Coconut">Coconut</option>
                    <option value="Oatmilk">Oatmilk</option>
                    <option value="Soy">Soy</option>
                </select>
                {/* Status */}
                <label for="item-milk-status"> Temperature:</label>
                <select id="item-milk-status" onChange={(e) => setStatus(e.target.value === '--Please choose an option--' ? 'Hot' : e.target.value)}>
                    <option value="--Please choose an option--">--Please choose an option--</option>
                    <option value='Iced'>Iced</option>
                    <option value="Cold">Cold</option>
                    <option value="Warm">Warm</option>
                    <option value="Hot">Hot</option>
                    <option value="Very Hot">Very Hot</option>
                    <option value="Steamed">Steamed</option>
                </select>
                {/* Shots */}
                <label for="item-milk-shot">Espresso & shot Options:</label>
                <select id="item-milk-shot" onChange={(e) => setShot(e.target.value === '--Please choose an option--' ? 'None' : e.target.value)}>
                    <option value="--Please choose an option--">--Please choose an option--</option>
                    <option value="Signature Espresso Roast">Signature Espresso Roast</option>
                    <option value="">Blond Espresso Roast</option>
                    <option value="Blond Espresso Roast">Decaf Espresso Roast</option>
                    <option value="1/3 Decaf Espresso Roast">1/3 Decaf Espresso Roast</option>
                    <option value="1/2 Decaf Espresso Roast">1/2 Decaf Espresso Roast</option>
                    <option value="2/3 Decaf Espresso Roast">2/3 Decaf Espresso Roast</option>
                </select>
                {/* Custom  */}
                <textarea onChange={(e) => setCustom(e.target.value)} placeholder='Custom Instructions'></textarea>
                <button>
                    add Instruction to Item
                </button>
            </form>
        </>
    )

}

export default InstructionsModal
