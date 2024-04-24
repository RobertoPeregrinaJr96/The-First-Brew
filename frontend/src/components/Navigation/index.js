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
          <img className='nav-list-img' src='https://cdn.discordapp.com/attachments/1088906268485357618/1232832890530955274/cup_of_coffee.png?ex=662ae49a&is=6629931a&hm=af82cde615cd733d5b5ec2ccd6bbf41c673f5c6ce5862679426e89bc83eafcd3&' alt=''></img>
        </NavLink>
        <NavLink exact to="/">
          <h1 className='nav-h1'>The First Brew</h1>
        </NavLink>
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
