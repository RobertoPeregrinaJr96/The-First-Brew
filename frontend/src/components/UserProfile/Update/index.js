import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Modal, useModal } from "../../../context/Modal";
import { useEffect, useState } from "react";
import { fetchUserThunk } from '../../../store/session'
import { fetchUpdateUserThunk } from '../../../store/user';
import './index.css'

const UpdateProfileModal = ({ user }) => {
    console.log('user in edit', user)

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    // EDIT
    const [error, setError] = useState({})
    const [bool, setBool] = useState(true)
    const [edit, setEdit] = useState(false); // switch
    const [first, setFirst] = useState(user.firstName ? user.firstName : '') // firstName
    const [last, setLast] = useState(user.lastName ? user.lastName : '') // lastName
    const [phone, setPhone] = useState(user.phoneNumber ? user.phoneNumber : '') // phone
    const [username, setUsername] = useState(user.username ? user.username : '') // userName
    const [email, setEmail] = useState(user.email ? user.email : '') // email

    const phoneLength = String(phone).length

    // SUBMIT
    const handleSubmit = (e) => {

        setFirst(first.trim())
        setLast(last.trim())
        setUsername(username.trim())
        setEmail(email.trim())

        e.preventDefault();

        const err = {}
        setError(err)
        // min length
        if (!first.trim().length) err.first = "Cannot be empty"
        if (!last.trim().length) err.last = "Cannot be empty"
        if (!username.trim().length) err.username = "Cannot be empty"
        if (!email.trim().length) err.email = "Cannot be empty"
        // max length
        if (first.length > 30) err.first = "Cannot exceed 30 characters"
        if (last.length > 30) err.last = "Cannot exceed 30 characters"
        if (phone.length > 12) err.phone = "Cannot exceed 12 characters"
        if (username.length > 30) err.username = "Cannot exceed 30 characters"
        if (email.length > 30) err.email = "Cannot exceed 30 characters"
        if (Number(email.split('').pop())) err.email = "Has to end in a valid address"
        // Demo user constraints
        if (user.id === 1 && user.username !== username) err.username = "Demo user's username cannot be Changed"
        if (user.id === 1 && user.email !== email) err.username = "Demo user's email cannot be Changed"

        setError(err)
        if (Object.values(err).length === 0) {
            const editUser = {
                first,
                last,
                phone,
                username,
                email,
            }
            dispatch(fetchUpdateUserThunk(editUser, user?.id))
            dispatch(fetchUserThunk(user?.id))
            dispatch(fetchUserThunk(user?.id))
            setFirst(user.firstName ? user.firstName : '')
            setLast(user.lastName ? user.lastName : '')
            setPhone(user.phoneNumber ? user.phoneNumber : '')
            setUsername(user.username ? user.username : '')
            setEmail(user.email ? user.email : '')
            setEdit(!edit)
            setBool(!bool)
            closeModal()
        }
        dispatch(fetchUserThunk(user?.id))
    }

    useEffect(() => {
        dispatch(fetchUserThunk(user?.id))
    }, [dispatch])

    return (
        <div className="update-user-wrapper">
            <div className='user-info-wrapper'>
                <form className='edit-profile-form' onSubmit={(e) => handleSubmit(e)}>
                    {/* FIRST NAME */}
                    <label className='edit-label' for='firstName'>first name:
                        <input id='firstName'
                            className="edit-input"
                            required
                            value={first}
                            onChange={(e) => { setFirst(e.target.value) }}
                        ></input>
                    </label>
                    <p className='counter-length'>{first.length}/30</p>
                    {error.first && <p className='edit-error'>{error.first}</p>}
                    {/* LAST NAME */}
                    <label className='edit-label' for='lastName'>Last name:
                        <input id='lastName'
                            className="edit-input"
                            value={last}
                            required
                            onChange={(e) => { setLast(e.target.value) }}
                        ></input>
                    </label>
                    {error.last && <p className='edit-error'>{error.last}</p>}
                    <p className='counter-length'>{last.length}/30</p>
                    {/* PHONE NUMBER */}
                    <label className='edit-label' for='phone'>
                        Phone number:
                        <input id='phone'
                            className="edit-input"
                            type='number'
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        ></input>
                    </label>
                    <p className='counter-length'>{phoneLength}/12</p>
                    {error.phone && <p>{error.phone}</p>}
                    {/* USERNAME */}
                    <label className='edit-label' for='Username'>Username:
                        <input id='Username'
                            className="edit-input"
                            value={username}
                            required
                            onChange={(e) => { setUsername(e.target.value) }}
                        ></input>
                    </label>
                    <p className='counter-length'>{username.length}/30</p>
                    {error.username && <p className='edit-error'>{error.username}</p>}
                    {/* EMAIL */}
                    <label className='edit-label' for='Email'>Email:
                        <input id='Email'
                            className="edit-input"
                            value={email}
                            required
                            type='email'
                            onChange={(e) => { setEmail(e.target.value) }}
                        ></input>
                    </label>
                    {error.email && <p className='edit-error'>{error.email}</p>}
                    {/* EXTRA INSTRUCTIONS */}
                    <p className='counter-length'>{email.length}/30</p>

                    <div className='profile-edit-button-div'>
                        <button className='user-edit-save' type='submit' onSubmit={(e) => handleSubmit(e)}>Save</button>
                    </div>
                </form>
            </div>
        </div >
    )
}


export default UpdateProfileModal
