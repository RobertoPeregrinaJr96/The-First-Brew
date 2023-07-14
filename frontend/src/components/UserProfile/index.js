// package
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


import './index.css';
//Componenets
import OpenModalButton from '../OpenModalButton';
import DeleteModal from './Delete';
import { fetchUpdateUserThunk } from '../../store/user';

const UserProfile = () => {

    const dispatch = useDispatch();
    // useSelector
    const user = useSelector(state => state.session.user)


    // EDIT
    const [error, serError] = useState({})
    const [edit, setEdit] = useState(false); // switch
    const [first, setFirst] = useState(user.firstName) // firstName
    const [last, setLast] = useState(user.lastName) // lastName
    const [phone, setPhone] = useState(user.phoneNumber) // phone
    const [username, setUsername] = useState(user.username) // userName
    const [email, setEmail] = useState(user.email) // email
    // DELETE

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();

        const err = {}

        if (first.length) err.first = ""
        if (last.length) err.last = ""
        if (phone.length) err.phone = ""
        if (username.length) err.username = ""
        if (email.length) err.email = ""

        if (Object.values(err) === 0) {
            const editUser = {
                first,
                last,
                phone,
                username,
                email
            }

            dispatch(fetchUpdateUserThunk(editUser, user.id))
        }
    }

    console.log("user", user)
    useEffect(() => {

    }, [dispatch])

    return (
        <div className='main-profile-wrapper'>
            <div className='profile-layout'>
                <div className='user-img-wrapper'>
                    <img className='profile-user-img' src={`${user?.profileImageUrl}`} />
                </div>
                <div className='user-info-wrapper'>
                    <button onClick={(e) => setEdit(!edit)}>edit</button>
                    {
                        edit ? (
                            <form className='edit-profile-form'>
                                {/* FIRST NAME */}
                                <label className='edit-label' for='firstName'>first name:
                                    <input id='firstName'
                                        value={first}
                                        placeholder={`${first}`}
                                        onChange={(e) => { setFirst(e.target.value) }}
                                    ></input>
                                </label>
                                {error.first && <p>ERROR</p>}
                                {/* LAST NAME */}
                                <label className='edit-label' for='lastName'>Last name:
                                    <input id='lastName'
                                        value={last}
                                        placeholder={`${last}`}
                                        onChange={(e) => { setLast(e.target.value) }}
                                    ></input>
                                </label>
                                {error.first && <p>ERROR</p>}
                                {/* PHONE NUMBER */}
                                <label className='edit-label' for='phone'>
                                    Phone number:
                                    <input id='phone'
                                        value={phone}
                                        placeholder={`${phone}`}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    ></input>
                                </label>
                                {error.phone && <p>ERROR</p>}
                                {/* USERNAME */}
                                <label className='edit-label' for='Username'>Username:
                                    <input id='Username'
                                        value={username}
                                        placeholder={`${username}`}
                                        onChange={(e) => { setUsername(e.target.value) }}
                                    ></input>
                                </label>
                                {error.first && <p>ERROR</p>}
                                {/* EMAIL */}
                                <label className='edit-label' for='Email'>Email:
                                    <input id='Email'
                                        value={email}
                                        placeholder={`${email}`}
                                        onChange={(e) => { setFirst(e.target.value) }}
                                    ></input>
                                </label>
                                {error.first && <p>ERROR</p>}
                                {/* EXTRA INSTRUCTIONS */}
                                <textarea></textarea>
                                {error.first && <p>ERROR</p>}
                                <button >Save</button>
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
                    <div className='profile-edit'>

                    </div>

                </div>

            </div>
            <div>
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
