import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import { fetchPostUserCart } from "../../store/carts";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {

    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});

      const err = {}

      if (email.length === 0) err.email = "Confirm Password "
      if (email.length >= 30) err.email = "Confirm Password "
      if (username.length === 0) err.username = "Confirm Password "
      if (username.length >= 30) err.username = "Confirm Password "
      if (firstName.length === 0) err.firstName = "Confirm Password "
      if (firstName.length === 0) err.firstName = "Confirm Password "
      if (firstName.length >= 30) err.firstName = "Confirm Password "
      if (lastName.length === 0) err.lastName = "Confirm Password "
      if (typeof lastName === String) err.lastName = "Confirm Password "
      if (lastName.length >= 30) err.lastName = "Confirm Password "
      if (password.length === 0) err.password = "Confirm Password "
      if (password.length >= 20) err.password = "Confirm Password "


      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });

    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password  "
    });
  };

  let boolean = false;
  const checkState = () => {
    if (email.length === 0 || username <= 3 || username.length === 0 || lastName.length === 0 || password.length <= 5 || confirmPassword.length === 0) boolean = true
    return boolean
  }

  // const checkState = () => {
  //   if (username <= 3 || username.length === 0) boolean = true
  //   if (lastName.length === 0) boolean = true
  //   if (password.length <= 5) boolean = true
  //   if (Object.values(errors).length) boolean = true
  // }

  return (
    <div className="sign-up-div">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="sign-up-form"   >
        <label>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          Email
        </label>
        {errors.email && <p className="errors">{errors.email}</p>}
        <label>

          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            title="Please make Unique and between 1 and 30 characters"
          />
          Username
        </label>
        {errors.username && <p className="errors">{errors.username}</p>}
        <label>

          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          First name
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          Last name
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          Password
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>

          <input
            type="password"
            placeholder=" Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          Confirm Password
        </label>
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button type="submit" className="sign-up-submit" disabled={checkState()} >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
