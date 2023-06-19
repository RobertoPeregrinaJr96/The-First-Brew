// frontend / src / components / Navigation / ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";
import './Navigation.css';

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // closeMenu();
    history.push('/')
  };
  const cart = (e) => {
    e.preventDefault();
    history.push('/cart')

  }
  /*
   I want to show the Login && Sign up button MODAL when the User is not Logged IN and show the Profile Button && Cart Button Links when the User is Logged in
  */
  return (
    <ul>
      {
        user ?
          (<>
            <button onClick={(e) => logout(e)}>Logout</button>
            <button onClick={(e) => cart(e)}>Cart</button>
          </>) : (
            <div className="nav-topRight-modal" >
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div >
          )

      }


    </ul>


  )
}

export default ProfileButton;
