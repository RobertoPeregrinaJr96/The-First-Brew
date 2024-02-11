// package
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


import './index.css';
//Components
import OpenModalButton from '../OpenModalButton';
import DeleteModal from './Delete';
import { fetchUpdateUserThunk } from '../../store/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    // useSelector
    const user = useSelector(state => state.session.user)
    console.log("user", user)


    // EDIT
    const [error, setError] = useState({})
    const [edit, setEdit] = useState(false); // switch
    const [first, setFirst] = useState(user.firstName ? user.firstName : '') // firstName
    const [last, setLast] = useState(user.lastName ? user.lastName : '') // lastName
    const [phone, setPhone] = useState(user.phoneNumber ? user.phoneNumber : '') // phone
    const [username, setUsername] = useState(user.username ? user.username : '') // userName
    const [email, setEmail] = useState(user.email ? user.email : '') // email
    // DELETE

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const err = {}
        setError(err)
        // min length
        if (!first.length) err.first = "Cannot be empty"
        if (!last.length) err.last = "Cannot be empty"
        if (!username.length) err.username = "Cannot be empty"
        if (!email.length) err.email = "Cannot be empty"
        console.log("err", err)
        // max length
        if (first.length > 30) err.first = "Cannot exceed 30 characters"
        if (last.length > 30) err.last = "Cannot exceed 30 characters"
        if (phone.length > 12) err.phone = "Cannot exceed 12 characters"
        if (username.length > 30) err.username = "Cannot exceed 30 characters"
        if (email.length > 30) err.email = "Cannot exceed 30 characters"
        console.log("err", err)

        setError(err)
        console.log(Object.values(err).length)
        if (Object.values(err).length === 0) {
            // console.log("first", first)
            // console.log("edit", edit)
            // console.log("last", last)
            // console.log("phone", phone)
            // console.log("username", username)
            // console.log("email", email)
            const editUser = {
                first,
                last,
                phone,
                username,
                email,
            }
            console.log('editUser', editUser)
            console.log("userId", user.id)
            dispatch(fetchUpdateUserThunk(editUser, user.id))
        }
    }

    // console.log("user", user)
    useEffect(() => {

    }, [dispatch])

    return (
        <div className='main-profile-wrapper'>
            <div className='profile-layout'>
                <div className='user-img-wrapper'>
                    {<img className='profile-user-img' src={`${user?.profileImageUrl}`} />}
                </div>
                <div className='user-info-wrapper'>
                    <button className='user-edit-button' onClick={(e) => setEdit(!edit)}>edit</button>
                    {
                        edit ? (
                            <form className='edit-profile-form' onSubmit={(e) => handleSubmit(e)}>
                                {/* FIRST NAME */}
                                <label className='edit-label' for='firstName'>first name:
                                    <input id='firstName'
                                        required
                                        value={first}
                                        // placeholder={`${first}`}
                                        onChange={(e) => { setFirst(e.target.value) }}
                                    ></input>
                                </label>
                                <p className='counter-length'>{first.length}/30</p>
                                {error.first && <p className='edit-error'>{error.first}</p>}
                                {/* LAST NAME */}
                                <label className='edit-label' for='lastName'>Last name:
                                    <input id='lastName'
                                        value={last}
                                        required
                                        // placeholder={`${last}`}
                                        onChange={(e) => { setLast(e.target.value) }}
                                    ></input>
                                </label>
                                {error.last && <p className='edit-error'>{error.last}</p>}
                                <p className='counter-length'>{last.length}/12</p>
                                {/* PHONE NUMBER */}
                                <label className='edit-label' for='phone'>
                                    Phone number:
                                    <input id='phone'
                                        required
                                        type='number'
                                        value={phone}
                                        // placeholder={`${phone}`}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    ></input>
                                </label>
                                <p className='counter-length'>{phone.length}/12</p>
                                {error.phone && <p>{error.phone}</p>}
                                {/* USERNAME */}
                                <label className='edit-label' for='Username'>Username:
                                    <input id='Username'
                                        value={username}
                                        required
                                        // placeholder={`${username}`}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                    ></input>
                                </label>
                                <p className='counter-length'>{username.length}/30</p>
                                {error.username && <p className='edit-error'>{error.username}</p>}
                                {/* EMAIL */}
                                <label className='edit-label' for='Email'>Email:
                                    <input id='Email'
                                        value={email}
                                        required
                                        type='email'

                                        // placeholder={`${email}`}
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    ></input>
                                </label>
                                {error.email && <p className='edit-error'>{error.email}</p>}
                                {/* EXTRA INSTRUCTIONS */}
                                <p className='counter-length'>{email.length}/30</p>
                                <textarea className='edit-textarea'></textarea>
                                <div className='profile-edit-button-div'>
                                    <button className='user-edit-save' type='submit' onSubmit={(e) => handleSubmit(e)}>Save</button>
                                </div>
                            </form>
                        ) : (
                            <div className='profile-default'>
                                <p>{`First name : ${user.firstName}`}</p>
                                <p>{`Last name : ${user.lastName}`}</p>
                                <p>{`Phone number : ${user.phoneNumber}`}</p>
                                <p>{`Username : ${user.username}`}</p>
                                <p>{`Email : ${user.email}`}</p>
                            </div>)
                    }

                </div>

            </div>
            <div className='profile-delete-button'>
                <OpenModalButton
                    buttonText={`Delete Profile`}
                    modalComponent={<DeleteModal />}
                >
                </OpenModalButton>
            </div>
        </div>

    )
}

export default UserProfile
