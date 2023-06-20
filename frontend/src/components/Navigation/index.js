// frontend/src/components/Navigation/index.js
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  // console.log("SESSION:", sessionUser)


  useEffect(() => {
    // console.log('Navigation')
  }, [])
  return (
    <div className='nav-wrapper'>
      <div className='nav-div-topLeft'>
        <NavLink exact to="/">
          <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1118284501710295100/PngItem_30012.png' alt=''></img>
        </NavLink>
        <h1 className='nav-h1'>The First Brew</h1>
      </div>
      <div className='nav-div-topRight'>

        {isLoaded && (

          <ProfileButton user={sessionUser} />

        )}

      </div>

    </div>
  );
}

export default Navigation;
