// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const demoUser = (e) => {
    return dispatch(sessionActions.login({ credential: 'DemoUser', password: 'password' })).then(closeModal)
  }
  let stateCheck = credential.length >= 4 && password.length >= 6 ? true : false
  // console.log('password in Nav', password)
  // console.log('credential in Nav', credential)

  return (
    <div className="login-div">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>
          {/* Username or Email */}
          <input
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button type="submit" disabled={!stateCheck} className="submit-button">Log In</button>
        <button onClick={demoUser} type="submit" className="demo-user">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
