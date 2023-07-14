import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


const InstructionsModal = () => {

    const [size, setSize] = useState('')
    const [milk, setMilk] = useState('2% Milk')
    const [status, setStatus] = useState('Warm')
    const [shot, setShot] = useState('')



    return (
        <>
            <form className='instructions-form'>
                {/* MILK */}
                <label for="item-Size">Size:</label>
                <select id="item-Size">
                    <option value="">--Please choose an option--</option>
                    <option value="">Small</option>
                    <option value="">Medium</option>
                    <option value="">large</option>
                    <option value="">Extra Large</option>
                    <option value="">Gallon</option>
                    <option value="">Office (3 Gallons)</option>
                </select>
                {/* Milk */}
                <label for="item-Milk">Milk:</label>
                <select id="item-Milk">
                    <option value="">--Please choose an option--</option>
                    <option value="">Heavy Cream</option>
                    <option value="">Vanilla Sweet Cream</option>
                    <option value="">Nonfat Milk</option>
                    <option value="">2% Milk</option>
                    <option value="">Whole Mlik</option>
                    <option value="">{`Breve (Half & Half)`}</option>
                    <option value="">Almond</option>
                    <option value="">Coconut</option>
                    <option value="">Oatmilk</option>
                    <option value="">Soy</option>
                </select>
                {/* Status */}
                <label for="item-milk-status">Milk status:</label>
                <select id="item-milk-status">
                    <option value="">--Please choose an option--</option>
                    <option value="">Warm</option>
                    <option value="">Cold</option>
                    <option value="">Steamed</option>
                    <option value="">Very Hot</option>
                </select>
                {/* Shots */}
                <label for="item-milk-shot">Espresso & shot Options:</label>
                <select id="item-milk-shot">
                    <option value="">--Please choose an option--</option>
                    <option value="">Signature Espresso Roast</option>
                    <option value="">Blond Espresso Roast</option>
                    <option value="">Decaf Espresso Roast</option>
                    <option value="">1/3 Decaf Espresso Roast</option>
                    <option value="">1/2 Decaf Espresso Roast</option>
                    <option value="">2/3 Decaf Espresso Roast</option>
                </select>
                {/*  */}
                {/* <label for="item-milk">Milk:</label>
                <select id="item-milk">
                    <option value="">--Please choose an option--</option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                    <option value=""></option>
                </select> */}
                <button>
                    add Instruction to Item
                </button>
            </form>
        </>
    )

}

export default InstructionsModal
