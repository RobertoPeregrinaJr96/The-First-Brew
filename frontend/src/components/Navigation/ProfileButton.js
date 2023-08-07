// frontend / src / components / Navigation / ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { useHistory } from "react-router-dom";
import './Navigation.css';
import { fetchAllCartThunk, fetchUserCartThunk } from "../../store/carts";

const ProfileButton = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const userCart = useSelector(state => state.cart.userCart)
  const userCartItems = userCart[0]
  const items = userCartItems?.Items
  let totalQuantity = 0
  if (items) {
    items.forEach(object => {
      let num = Number(object.quantity)
      totalQuantity += num
    });
  }
  useEffect(() => {
    dispatch(fetchAllCartThunk())
    dispatch(fetchUserCartThunk())
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
    history.push('/')
  };
  const cart = (e) => {
    e.preventDefault();
    history.push('/cart')
  }
  const profile = (e) => {
    e.preventDefault();
    history.push('/profile')
  }
  /*
   I want to show the Login && Sign up button MODAL when the User is not Logged IN and show the Profile Button && Cart Button Links when the User is Logged in
  */
  return (
    <ul className="profile-ul">
      {
        user ?
          (<div className="nav-topRight-modal" >
            <button className="nav-topRight-logged logout" onClick={(e) => logout(e)}>Logout</button>
            <button className="nav-topRight-logged cart" onClick={(e) => cart(e)}><i class="fa-solid fa-cart-shopping"></i>{items ? ` ${totalQuantity}` : ''}</button>
            <button className="nav-topRight-Profile profile" onClick={(e) => profile(e)}>Profile</button>
          </div>) : (
            <div className="nav-topRight-modal" >
              <button className="nav-topRight-modal-loggedIn">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </button>
              <button className="nav-topRight-modal-signUp">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </button>
            </div >
          )

      }


    </ul>


  )
}

export default ProfileButton;
