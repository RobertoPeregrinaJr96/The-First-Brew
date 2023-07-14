import { useDispatch, useSelector } from "react-redux"
import { fetchDeleteUserThunk } from "../../../store/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useModal } from "../../../context/Modal";





const DeleteModal = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();


    const user = useSelector(state => state.session.user)

    const handleSubmit = (e, id) => {
        e.preventDefault();

        dispatch(fetchDeleteUserThunk(id))
        closeModal()
        history.push("/")
    }

    return (
        <div>

            <button
                onClick={(e) => { handleSubmit(e, user.id) }}
            >
                DELETE
            </button>
        </div>
    )
}


export default DeleteModal
