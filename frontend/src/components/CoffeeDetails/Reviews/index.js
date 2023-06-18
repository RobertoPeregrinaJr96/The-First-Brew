// import { useParams } from 'react-router-dom'
// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './index.css'


// const CoffeeDetail = ({ coffee, user }) => {

//     console.log("coffee in Detail", coffee)
//     console.log("user in Detail", user)
//     // general Variables
//     const dispatch = useDispatch()
//     const [title, setTitle] = useState('')
//     const [review, setReview] = useState('')
//     const [rating, setRating] = useState(1)
//     const [errors, setErrors] = useState({})
//     const [bool, setBool] = useState(false)
//     const { closeModal } = useModal()


//     const handleSubmit = (e) => {
//         e.preventDefault();


//     }

//     return (
//         <div className="coffee-detail-wrapper">
//             <form className='coffee-detail-form' onSubmit={() => handleSubmit(e)} >

//                 <label>
//                     <input placeholder="Title">

//                     </input>
//                 </label>
//                 <label>
//                     <textarea placeholder="Review">

//                     </textarea>

//                 </label>
//             </form>
//         </div >
//     )
// }

// export default CoffeeDetail
