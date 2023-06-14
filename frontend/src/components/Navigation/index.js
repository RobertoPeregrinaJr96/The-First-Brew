// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  console.log("SESSION:", sessionUser)


  useEffect(() => {
    console.log('Navigation')
  }, [])
  return (
    <ul className='nav-list'>
      <li className='nav-list-logo'>
        <div className='nav-link-div'>
          <NavLink exact to="/">
            <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1118284501710295100/PngItem_30012.png' alt=''></img>
          </NavLink>
          <h1>The First Brew</h1>
        </div>
      </li>
      {isLoaded && (
        <li className='nav-landingPage'>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
