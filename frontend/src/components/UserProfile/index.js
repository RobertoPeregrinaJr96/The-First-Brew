// package
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";


import './index.css';
//Components
import OpenModalButton from '../OpenModalButton';
import DeleteModal from './Delete';
import { fetchUpdateUserThunk } from '../../store/user';
import { fetchUserThunk } from '../../store/session';
import UpdateProfileModal from './Update';

const UserProfile = () => {

    const dispatch = useDispatch();
    // useSelector
    const user = useSelector(state => state.session.user)
    // console.log("user in component", user['phoneNumber'] )
    useEffect(() => {
        dispatch(fetchUserThunk(user?.id))
    }, [dispatch])

    return (
        <div className='main-profile-wrapper'>
            <div className='profile-layout'>
                <div className='user-img-wrapper'>
                    {<img className='profile-user-img' src={`${user?.profileImageUrl}`} />}
                </div>
                <div className='profile-update-button'>
                    <OpenModalButton
                        buttonText={<i class="fa-solid fa-pen-to-square"></i>}
                        modalComponent={<UpdateProfileModal user={user} />}
                    >
                    </OpenModalButton>
                </div>
                <div className='user-profile-info-wrapper'>
                    <div className='profile-default'>
                        <p>{`First name : ${user.firstName}`}</p>
                        <p>{`Last name : ${user.lastName}`}</p>
                        <p>{`Phone number : ${user['phoneNumber'] ? user.phoneNumber : '* Optional *'}`}</p>
                        <p>{`Username : ${user.username}`}</p>
                        <p>{`Email : ${user.email}`}</p>
                    </div>
                </div>

                <div className='profile-delete-button'>
                    <OpenModalButton
                        buttonText={<i class="fa-solid fa-trash"></i>}
                        modalComponent={<DeleteModal />}
                    >
                    </OpenModalButton>
                </div>
            </div>
        </div>

    )
}

export default UserProfile
