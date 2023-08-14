import { useDispatch, useSelector } from "react-redux"
import { fetchDeleteUserThunk } from "../../../store/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";
import { useState } from "react";
import { logout } from "../../../store/session";
import './index.css'

const DeleteModal = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const [errors, setErrors] = useState({})

    const user = useSelector(state => state.session.user)

    const handleSubmit = (e, id) => {
        e.preventDefault();
        const err = {}
        if (Number(id) === Number(1)) err.demo = 'Cannot Delete Demo User'
        setErrors(err)
        if (Object.values(err).length !== 0) {
            setErrors(err)
        }
        if (Object.values(err).length === 0) {
            dispatch(fetchDeleteUserThunk(id))
            dispatch(logout())
            closeModal()
            history.push("/")
        }
    }

    return (
        <div className="delete-user-wrapper">
            <div className="div-delete-wrapper">
                <div className="delete-user-div">
                    <p>Are you sure you want to delete your profile?</p>
                    {errors.demo ? <p id="delete-user-errors">{errors.demo}
                    </p> : ''}
                    <div className="delete-user-button-wrapper">
                        <div className="delete-user-button-div">
                            <button className="delete-user-cancel" onClick={(e) => closeModal(e)}>Cancel</button>
                        </div>
                        <div className="delete-user-button-div">
                            <button
                                className="delete-user-submit"
                                onClick={(e) => { handleSubmit(e, user.id) }} >
                                DELETE
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default DeleteModal
