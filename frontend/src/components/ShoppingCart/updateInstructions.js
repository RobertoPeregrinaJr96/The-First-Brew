// package import
import { useEffect, useState } from 'react';
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from 'react-redux';
import './index.css'
import { fetchInstructionsUpdate } from '../../store/item';
import { fetchUserCartThunk } from '../../store/carts';




const UpdateInstructions = ({ item }) => {
    // general variables
    const [boolean, setBoolean] = useState()
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    // item breakdown
    const itemInstructions = item?.Instruction[0] ? item?.Instruction[0] : []
    // console.log(" itemInstructions: ", itemInstructions)
    const instructionItems = itemInstructions?.InstructionItem ? itemInstructions?.InstructionItem : []
    // console.log(" instructionItems: ", instructionItems)

    const [itemSizeInstruction, itemMilkInstruction, itemTempInstruction, itemShotInstruction] = instructionItems

    const itemSize = itemSizeInstruction?.Addition['name']
    const itemMilk = itemMilkInstruction?.Addition['name']
    const itemTemp = itemTempInstruction?.Addition['name']
    const itemShot = itemShotInstruction?.Addition['name']

    const [size, setSize] = useState(itemSize ? itemSize : 'Small')
    // console.log('size', size)
    const [milk, setMilk] = useState(itemMilk ? itemMilk : '2% Milk')
    // console.log('milk', milk)
    const [temperature, setTemperature] = useState(itemTemp ? itemTemp : 'Warm')
    // console.log('temperature', temperature)
    const [shot, setShot] = useState(itemShot ? itemShot : 'No Espresso shot')
    // console.log('shot', shot)
    const [custom, setCustom] = useState(itemInstructions.custom)
    // console.log('custom', custom)

    const handleSubmit = (e, item) => {
        e.preventDefault()
        const newInstructionItems = [
            [size, itemSizeInstruction?.['id']],
            [milk, itemMilkInstruction?.['id']],
            [temperature, itemTempInstruction?.['id']],
            [shot, itemShotInstruction?.['id']],
        ]
        console.log('newInstruction', newInstructionItems)
        const instructions = [custom, itemSizeInstruction?.instructionId]
        console.log('instructions', instructions)
        const request = [newInstructionItems, instructions]
        console.log('request', request)

        dispatch(fetchInstructionsUpdate(item.id, request))
        dispatch(fetchUserCartThunk())
        dispatch(fetchUserCartThunk())

        closeModal()
    }

    return (
        <div>
            < form className='instructions-form' onSubmit={(e) => handleSubmit(e, item)}>
                {/* MILK */}
                < label for="item-Size" > Size:</label >
                <select
                    id="item-Size"
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value={`${size}`} selected>{`${size}`}</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="large">large</option>
                    <option value="Extra Large">Extra Large</option>
                    <option value="Gallon">Gallon</option>
                    <option value="Office (3 Gallons)">Office (3 Gallons)</option>
                </select>
                {/* Creamer */}
                <label for="item-Creamer">Creamer:</label>
                <select id="item-Creamer" onChange={(e) => setMilk(e.target.value)}>
                    <option value={`${milk}`} selected>{`${milk}`}</option>
                    <option value="No Creamer">No Creamer</option>
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
                <label for="item-milk-temperature"> Temperature:</label>
                <select id="item-milk-temperature" onChange={(e) => setTemperature(e.target.value)}>
                    <option value={`${temperature}`} selected>{`${temperature}`}</option>
                    <option value='Iced'>Iced</option>
                    <option value="Cold">Cold</option>
                    <option value="Warm">Warm</option>
                    <option value="Hot">Hot</option>
                    <option value="Very Hot">Very Hot</option>
                    <option value="Steamed">Steamed</option>
                </select>
                {/* Shots */}
                <label for="item-milk-shot">Espresso shot Options:</label>
                <select id="item-milk-shot" onChange={(e) => setShot(e.target.value)}>
                    <option value={`${shot}`} selected>{`${shot}`}</option>
                    <option value="No Espresso shot">No Espresso shot</option>
                    <option value="Signature Espresso Roast">Signature Espresso Roast</option>
                    <option value="">Blond Espresso Roast</option>
                    <option value="Blond Espresso Roast">Decaf Espresso Roast</option>
                    <option value="1/3 Decaf Espresso Roast">1/3 Decaf Espresso Roast</option>
                    <option value="1/2 Decaf Espresso Roast">1/2 Decaf Espresso Roast</option>
                    <option value="2/3 Decaf Espresso Roast">2/3 Decaf Espresso Roast</option>
                </select>
                {/* Custom  */}
                <textarea value={custom} onChange={(e) => setCustom(e.target.value)} placeholder='Custom Instructions'></textarea>
                <button type='submit' onClick={(e) => handleSubmit(e, item)}>Update Instructions</button>
            </form >

        </div>
    )
}
export default UpdateInstructions
